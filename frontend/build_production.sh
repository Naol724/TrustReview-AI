#!/bin/bash
"""
Production build script for TrustReview AI Frontend
"""

echo "Building TrustReview AI Frontend for Production..."

# Install dependencies
echo "Installing Node.js dependencies..."
npm ci --only=production

# Build for production
echo "Building production bundle..."
npm run build

# Create production deployment package
echo "Creating deployment package..."
mkdir -p dist_package
cp -r dist/* dist_package/
cp package.json dist_package/
cp -r node_modules dist_package/

echo "Production build completed successfully!"
echo "Files ready for deployment in: dist_package/"
echo "Build artifacts in: dist/"
