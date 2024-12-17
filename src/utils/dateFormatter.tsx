type DateFormat =
  | 'YYYY-MM-DD'
  | 'MM/DD/YYYY'
  | 'DD/MM/YYYY'
  | 'MMMM DD, YYYY'
  | 'DD MMM, YYYY'
  | 'full';

export function formatDate(
  dateInput: string | Date,
  format: DateFormat = 'YYYY-MM-DD',
): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const shortMonthNames = monthNames.map((m) => m.slice(0, 3));

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MMMM DD, YYYY':
      return `${monthNames[date.getMonth()]} ${day}, ${year}`;
    case 'DD MMM, YYYY':
      return `${day} ${shortMonthNames[date.getMonth()]}, ${year}`;
    case 'full':
      return `${monthNames[date.getMonth()]} ${day}, ${year} at ${date.toLocaleTimeString()}`;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}
