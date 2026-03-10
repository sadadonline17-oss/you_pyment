#!/bin/bash

echo "🚀 Starting deployment to Netlify..."
echo ""

# Check if build exists
if [ ! -d "dist" ]; then
  echo "❌ Build directory not found. Running build first..."
  npm run build
fi

echo ""
echo "✅ Build completed!"
echo ""

# Deploy using Netlify CLI if available
if command -v netlify &> /dev/null; then
  echo "📦 Deploying to Netlify using CLI..."
  netlify deploy --prod --dir=dist
else
  echo "⚠️  Netlify CLI not found."
  echo "📝 Manual deployment required:"
  echo "   1. Go to https://app.netlify.com/drop"
  echo "   2. Drag and drop the 'dist' folder"
  echo ""
  echo "🌐 Or connect your GitHub repo:"
  echo "   1. Go to https://app.netlify.com/start"
  echo "   2. Select 'Deploy settings' for your site"
  echo "   3. Set build command: npm run build"
  echo "   4. Set publish directory: dist"
fi

echo ""
echo "✅ Deployment script completed!"
