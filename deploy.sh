#!/bin/bash

echo "🚀 Deploying to Vercel..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌍 Your site is live at: https://hoppytech.com"
echo "🔗 Also available at: https://jkhopkins39-github-io.vercel.app" 