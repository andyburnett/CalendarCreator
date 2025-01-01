# Learning Schedule Calendar Generator

A client-side web application for generating customizable iCalendar (.ics) files, enabling users to create and download learning session schedules directly in the browser.

## Features

- 🗓️ Generate iCalendar (.ics) files for learning schedules
- 📱 Responsive design that works on mobile and desktop
- ⌨️ Keyboard navigation support
- ✨ Smooth animated transitions
- 🔌 WordPress integration support
- 📅 Cross-calendar application compatibility

## Technologies Used

- React + TypeScript
- Framer Motion for animations
- shadcn/ui + Tailwind CSS for styling
- Pure client-side implementation (no server required)

## Local Development

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [repo-name]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) to view the app in your browser.

## Building for Production

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` directory, ready for deployment.

## WordPress Integration

### Quick Start

1. Add required scripts to your WordPress theme's header:
```html
<!-- React and ReactDOM -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<!-- Framer Motion -->
<script src="https://unpkg.com/framer-motion@11.13.1/dist/framer-motion.min.js"></script>
<!-- Your bundled app -->
<script src="path/to/your/bundled-app.js"></script>
```

2. Add the shortcode to any page or post:
```
[calendar_app]
```

For detailed WordPress integration instructions, see [wordpress-integration.md](wordpress-integration.md).

## Features

### Calendar Generation
- Customizable start date and time
- Multiple frequency options (daily, every two days, weekly)
- Automatic .ics file generation
- Compatible with major calendar applications

### User Interface
- Step-by-step form with animations
- Keyboard navigation support
  - Arrow keys for navigation
  - Enter to proceed/submit
  - Escape to go back
- Responsive design for all screen sizes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
