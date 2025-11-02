export function useDateFormat() {
  const formatDate = (date: string | Date, format: 'short' | 'long' = 'short') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (format === 'long') {
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    
    return dateObj.toLocaleDateString('en-US');
  };

  const formatDateShort = (date: string | Date) => {
    return typeof date === 'string' ? date.split('T')[0] : date.toISOString().split('T')[0];
  };

  return { formatDate, formatDateShort };
}

