#!/bin/bash

# Create static distribution directory
rm -rf dist-static
mkdir -p dist-static/assets

# Build the application
npm run build

# Copy built assets to static distribution
cp dist/public/assets/index-*.js dist-static/assets/index.js
cp dist/public/assets/index-*.css dist-static/assets/index.css

echo "Static distribution has been created in dist-static/"
echo "Upload the contents of the dist-static directory to your web server"
