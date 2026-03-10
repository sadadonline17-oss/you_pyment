#!/bin/bash

echo "🚀 DEPLOYING TO NETLIFY NOW..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for token
if [ -z "$NETLIFY_TOKEN" ]; then
    echo "⚠️  Netlify token not found in environment."
    echo ""
    echo "✅ DEPLOYMENT PACKAGE READY!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 Package: dist/ (3.5M)"
    echo ""
    echo "🚀 MANUAL DEPLOYMENT REQUIRED:"
    echo ""
    echo "   Step 1: Visit https://app.netlify.com/drop"
    echo "   Step 2: Drag the 'dist' folder to deploy"
    echo "   Step 3: Your site is LIVE! 🎉"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📋 Expected Live URL:"
    echo "   https://{random-name}.netlify.app"
    echo ""
    echo "🎯 Test URLs after deployment:"
    echo "   /create/SA/shipping (Saudi - SAR)"
    echo "   /create/AE/shipping (UAE - AED)"
    echo "   /create/KW/shipping (Kuwait - KWD)"
    echo ""
    exit 0
fi

echo "✅ Netlify token found!"
echo ""

# Get sites
echo "🔍 Finding sites..."
SITES=$(curl -s -H "Authorization: Bearer $NETLIFY_TOKEN" \
    "https://api.netlify.com/api/v1/sites" 2>/dev/null)

SITE_ID=$(echo "$SITES" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$SITE_ID" ]; then
    echo "⚠️  No sites found. Creating new site..."
    
    RESPONSE=$(curl -s -X POST \
        -H "Authorization: Bearer $NETLIFY_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"name":"dynamic-payment-links"}' \
        "https://api.netlify.com/api/v1/sites" 2>/dev/null)
    
    SITE_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$SITE_ID" ]; then
        echo "❌ Failed to create site"
        echo "Please deploy manually at https://app.netlify.com/drop"
        exit 1
    fi
    
    echo "✅ Site created: $SITE_ID"
else
    echo "📍 Using site: $SITE_ID"
fi

# Deploy
echo ""
echo "📦 Creating deployment package..."
cd dist && zip -r ../netlify-deploy.zip . > /dev/null 2>&1 && cd ..

echo "🚀 Deploying to Netlify..."
DEPLOY_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $NETLIFY_TOKEN" \
    -H "Content-Type: application/zip" \
    --data-binary "@netlify-deploy.zip" \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" 2>/dev/null)

DEPLOY_URL=$(echo "$DEPLOY_RESPONSE" | grep -o '"deploy_url":"[^"]*"' | cut -d'"' -f4)
DEPLOY_STATE=$(echo "$DEPLOY_RESPONSE" | grep -o '"state":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$DEPLOY_URL" ]; then
    echo ""
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌐 Your site is LIVE:"
    echo "   $DEPLOY_URL"
    echo ""
    echo "📊 Status: $DEPLOY_STATE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🎯 Test the dynamic features:"
    echo "   • Create shipping link for DHL (UAE) → Should show AED"
    echo "   • Create shipping link for Aramex (SA) → Should show SAR"
    echo "   • Test Preview button → Opens with parameters"
    echo "   • Test Copy button → Copies URL with parameters"
    echo ""
else
    echo "❌ Deployment failed"
    echo "Response: $DEPLOY_RESPONSE"
    echo ""
    echo "💡 Try manual deployment at https://app.netlify.com/drop"
fi

# Cleanup
rm -f netlify-deploy.zip

