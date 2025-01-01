# WordPress Integration Instructions

## Step 1: Add Required Scripts
Add the following code to your WordPress theme's header.php file or use a header script plugin:

```html
<!-- React and ReactDOM -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<!-- Framer Motion -->
<script src="https://unpkg.com/framer-motion@11.13.1/dist/framer-motion.min.js"></script>
<!-- Your bundled app -->
<script src="path/to/your/bundled-app.js"></script>
```

## Step 2: Add the App Container
Add this HTML where you want the calendar app to appear:

```html
<div id="calendar-app-container"></div>
```

You can add this in:
- A WordPress page using the HTML block
- A template file
- A shortcode
- A widget

### Using Shortcode (Recommended)
Add this PHP code to your theme's functions.php:

```php
function calendar_app_shortcode() {
    return '<div id="calendar-app-container"></div>';
}
add_shortcode('calendar_app', 'calendar_app_shortcode');
```

Then use the shortcode in any page or post:
```
[calendar_app]
```

## Step 3: Initialize the App
The app will automatically initialize if it finds a div with id="calendar-app-container".

If you need to use a different container ID, you can manually initialize the app:
```javascript
window.initializeCalendarApp('your-custom-container-id');
```

## Styling
The app includes all necessary styles. If you need to override any styles, add your custom CSS in the WordPress Customizer or your theme's stylesheet.

## Troubleshooting
1. Make sure all required scripts are loaded before the app bundle
2. Check browser console for any errors
3. Ensure the container ID matches between your HTML and initialization code
4. If using a page builder, make sure HTML code is allowed in your content blocks
