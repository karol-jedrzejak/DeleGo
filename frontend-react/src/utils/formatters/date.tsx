export const formatDateTime = (value: string | null): string => {
  if (!value) return '—';

  const date = new Date(value.replace(' ', 'T'));

  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
    .replace(/\./g, ':') // zamiana separatorów na ':'
    .replace(',', ' -'); // zamiana przecinka między datą a godziną na ' -'
};