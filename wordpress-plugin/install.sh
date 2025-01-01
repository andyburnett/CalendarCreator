#!/bin/bash

# Create plugin directory structure
mkdir -p assets

# Copy bundled files from the React build
cp ../dist/public/assets/index-CYi9kX6J.js assets/wordpress-bundle.js
cp ../dist/public/assets/index-CDrsi66H.css assets/wordpress-bundle.css

echo "Installation completed successfully!"
echo "Now you can upload the entire 'wordpress-plugin' directory to your WordPress plugins folder."
