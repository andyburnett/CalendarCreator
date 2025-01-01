#!/bin/bash

# Build for GitHub Pages deployment
export VITE_BASE_URL="/$GITHUB_REPOSITORY_NAME"
npm run build

# Create gh-pages specific index.html
cp dist/public/index.html dist/public/404.html

echo "Build completed for GitHub Pages deployment"
echo "Files are ready in dist/public directory"
echo "Upload these files to your GitHub Pages branch"
