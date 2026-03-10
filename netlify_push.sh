#!/bin/bash

echo "🚀 Pushing to Netlify..."
echo ""

# Check if NETLIFY_TOKEN is set
if [ -z "$NETLIFY_TOKEN" ]; then
  echo "⚠️  NETLIFY_TOKEN not found in environment."
  echo ""
  echo "📝 To deploy to Netlify, you need:"
  echo "   1. Get your Netlify token from: https://app.netlify.com/user/applications#personal-access-tokens"
  echo "   2. Export it: export NETLIFY_TOKEN=your_token_here"
  echo "   3. Run: ./netlify_push.sh"
  echo ""
  echo "✅ Alternatively, use manual deployment:"
  echo "   → https://app.netlify.com/drop (drag dist folder)"
  echo ""
  exit 1
fi

echo "✅ Netlify token found!"
echo ""

# Try to deploy using Netlify API
echo "📦 Deploying using Netlify API..."
echo ""

# Get site ID from netlify.toml or list sites
echo "🔍 Finding site..."

# List sites to find our site
SITES_RESPONSE=$(curl -s -H "Authorization: Bearer $NETLIFY_TOKEN" \
  "https://api.netlify.com/api/v1/sites")

# Try to find a site by name or use the most recent one
SITE_ID=$(echo "$SITES_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$SITE_ID" ]; then
  echo "⚠️  Could not find site ID."
  echo "💡 Please create a site first at https://app.netlify.com/start"
  echo "   Or deploy manually at https://app.netlify.com/drop"
  exit 1
fi

echo "📍 Site ID: $SITE_ID"
echo ""

# Create a ZIP of dist folder
echo "📦 Creating deployment package..."
cd dist && zip -r ../deploy.zip . > /dev/null 2>&1 && cd ..

echo "✅ Package created: deploy.zip"
echo ""

# Deploy using Netlify API
echo "🚀 Uploading to Netlify..."
RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $NETLIFY_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary "@deploy.zip" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys")

DEPLOY_URL=$(echo "$RESPONSE" | grep -o '"deploy_url":"[^"]*"' | head -1 | cut -d'"' -f4)
DEPLOY_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$DEPLOY_ID" ]; then
  echo "✅ Deployment successful!"
  echo ""
  echo "🌐 Your site is live at:"
  echo "   https://$SITE_ID.netlify.app"
  if [ ! -z "$DEPLOY_URL" ]; then
    echo "   Direct link: $DEPLOY_URL"
  fi
  echo ""
  echo "📊 Deploy ID: $DEPLOY_ID"
  echo ""
  echo "⏳ Note: Deployment may take a few moments to propagate."
else
  echo "❌ Deployment failed."
  echo "Response: $RESPONSE"
  echo ""
  echo "💡 Try manual deployment at https://app.netlify.com/drop"
fi

# Clean up
rm -f deploy.zip

