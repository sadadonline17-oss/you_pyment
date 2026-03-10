#!/bin/bash

echo "🚀 Netlify Deployment Script"
echo "=============================="
echo ""

# Get Netlify token from environment or prompt
if [ -z "$NETLIFY_TOKEN" ]; then
  echo "⚠️  NETLIFY_TOKEN environment variable not set."
  echo "📝 To deploy automatically, you need to:"
  echo "   1. Get your Netlify token from: https://app.netlify.com/user/applications#personal-access-tokens"
  echo "   2. Set it: export NETLIFY_TOKEN=your_token_here"
  echo "   3. Run this script again"
  echo ""
  echo "✅ Alternative: Manual deployment at https://app.netlify.com/drop"
  exit 1
fi

# Find site ID from netlify.toml or ask user
if [ -f "netlify.toml" ]; then
  SITE_ID=$(grep -o 'site = "[^"]*"' netlify.toml | cut -d'"' -f2)
  if [ ! -z "$SITE_ID" ]; then
    echo "📍 Found site ID in netlify.toml: $SITE_ID"
  fi
fi

if [ -z "$SITE_ID" ]; then
  echo "⚠️  Site ID not found."
  echo "📝 Please either:"
  echo "   1. Add 'site = \"your-site-id\"' to netlify.toml"
  echo "   2. Set SITE_ID environment variable"
  exit 1
fi

echo ""
echo "📦 Deploying to Netlify..."
echo "Site ID: $SITE_ID"
echo ""

# Deploy using Netlify API
response=$(curl -s -X POST \
  -H "Authorization: Bearer $NETLIFY_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" \
  --data '{"draft": false}')

deploy_url=$(echo "$response" | grep -o '"deploy_url":"[^"]*"' | cut -d'"' -f4)
echo "✅ Deployment triggered!"
echo "🌐 URL: $deploy_url"
echo ""
echo "⏳ Build is in progress..."
echo "   Check status at: https://app.netlify.com/sites/$SITE_ID/overview"

