#!/bin/bash

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Create a temporary directory for packaging
rm -rf ./temp
mkdir -p ./temp/learning-schedule-calendar
mkdir -p ./temp/learning-schedule-calendar/assets

# Build the React application
cd ..
npm run build

# Copy the built files
cp dist/public/assets/index-*.js ./wordpress-plugin/temp/learning-schedule-calendar/assets/wordpress-bundle.js
cp dist/public/assets/index-*.css ./wordpress-plugin/temp/learning-schedule-calendar/assets/wordpress-bundle.css

# Copy plugin files
cd wordpress-plugin
cp calendar-app.php ./temp/learning-schedule-calendar/
cp assets/admin.css ./temp/learning-schedule-calendar/assets/
cp README.md ./temp/learning-schedule-calendar/

# Create the zip file
cd temp
zip -r ../learning-schedule-calendar.zip learning-schedule-calendar

# Cleanup
cd ..
rm -rf ./temp

echo "Plugin has been packaged as learning-schedule-calendar.zip"
