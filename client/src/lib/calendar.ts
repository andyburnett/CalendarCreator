// Types for calendar entries
interface CalendarEntry {
  title: string;
  description: string;
  link: string;
}

// Sample test data
export const calendarEntries: CalendarEntry[] = [
  {
    title: "Introduction to Programming",
    description: "Learn the basics of programming concepts and fundamental principles. This session covers variables, data types, and basic control structures.",
    link: "https://example.com/intro-programming"
  },
  {
    title: "Web Development Fundamentals",
    description: "Explore HTML, CSS, and JavaScript basics. Build your first web page and understand how the web works.",
    link: "https://example.com/web-dev"
  },
  {
    title: "Database Design",
    description: "Understanding database concepts, SQL basics, and best practices for data modeling. Practice with real-world examples.",
    link: "https://example.com/database"
  },
  {
    title: "API Development",
    description: "Learn how to create and consume APIs. Understanding REST principles and HTTP methods.",
    link: "https://example.com/api-dev"
  },
  {
    title: "Frontend Frameworks",
    description: "Introduction to modern frontend frameworks. Component-based architecture and state management.",
    link: "https://example.com/frontend"
  },
  {
    title: "Project Architecture",
    description: "Best practices in software architecture. Design patterns and system design principles.",
    link: "https://example.com/architecture"
  }
];

// Function to pad numbers with leading zeros
const pad = (num: number): string => String(num).padStart(2, '0');

// Format date to iCal format
const formatDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

// Calculate next date based on frequency
const getNextDate = (currentDate: Date, frequency: string): Date => {
  const nextDate = new Date(currentDate);

  switch (frequency) {
    case 'daily':
      nextDate.setDate(currentDate.getDate() + 1);
      break;
    case 'two-days':
      nextDate.setDate(currentDate.getDate() + 2);
      break;
    case 'weekly':
      nextDate.setDate(currentDate.getDate() + 7);
      break;
    default:
      nextDate.setDate(currentDate.getDate() + 1);
  }

  return nextDate;
};

// Generate iCal content
const generateICalContent = (startDate: Date, frequency: string): string => {
  let content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Calendar File Generator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  let currentDate = startDate;

  // Generate entries for each item in calendarEntries
  calendarEntries.forEach((entry, index) => {
    const eventStart = formatDate(currentDate);

    // Set event end time to 30 minutes after start
    const endDate = new Date(currentDate);
    endDate.setMinutes(endDate.getMinutes() + 30);
    const eventEnd = formatDate(endDate);

    // Format description with the link
    const description = `${entry.description}\n\nClick here to learn more: ${entry.link}`;

    content = content.concat([
      'BEGIN:VEVENT',
      `DTSTART:${eventStart}`,
      `DTEND:${eventEnd}`,
      `SUMMARY:${entry.title}`,
      `DESCRIPTION:${description}`,
      `URL:${entry.link}`,
      `LOCATION:${entry.link}`,
      'SEQUENCE:0',
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT'
    ]);

    currentDate = getNextDate(currentDate, frequency);
  });

  content.push('END:VCALENDAR');
  return content.join('\r\n');
};

// Generate and download calendar file
export const generateCalendarFile = (startDate: Date, frequency: string): void => {
  const content = generateICalContent(startDate, frequency);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'learning_schedule.ics';
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};