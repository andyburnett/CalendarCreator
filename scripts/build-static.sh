#!/bin/bash

# Create static distribution directory
rm -rf dist-static
mkdir -p dist-static/assets

# Build the application
npm run build

# Copy built assets to static distribution
cp -r dist/public/assets/* dist-static/assets/

# Copy index.html from the build
cp dist/public/index.html dist-static/index.html

# Update asset references in index.html
sed -i 's/index-[A-Za-z0-9]*\.js/index.js/g' dist-static/index.html
sed -i 's/index-[A-Za-z0-9]*\.css/index.css/g' dist-static/index.html

# Copy and rename main assets
find dist/public/assets -name "index-*.js" -exec cp {} dist-static/assets/index.js \;
find dist/public/assets -name "index-*.css" -exec cp {} dist-static/assets/index.css \;

echo "Static distribution has been created in dist-static/"
echo "The following files are ready for deployment:"
ls -R dist-static/