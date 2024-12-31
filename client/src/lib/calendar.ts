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

  // Generate 6 entries
  for (let i = 1; i <= 6; i++) {
    const eventStart = formatDate(currentDate);
    
    // Set event end time to 1 hour after start
    const endDate = new Date(currentDate);
    endDate.setHours(endDate.getHours() + 1);
    const eventEnd = formatDate(endDate);

    content = content.concat([
      'BEGIN:VEVENT',
      `DTSTART:${eventStart}`,
      `DTEND:${eventEnd}`,
      `SUMMARY:Entry ${i}`,
      `DESCRIPTION:Learning session ${i}`,
      'SEQUENCE:0',
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT'
    ]);

    currentDate = getNextDate(currentDate, frequency);
  }

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
