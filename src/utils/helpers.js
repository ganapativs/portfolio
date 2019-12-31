export function formatReadingTime(minutes) {
  return `${minutes} min read`;
}

export function formatPostDate(d) {
  let date = d;
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [
    'en',
    { day: 'numeric', month: 'long', year: 'numeric' },
  ].filter(Boolean);
  return date.toLocaleDateString(...args);
}

export const accentColors = [
  '#f1404b',
  '#FF2E63',
  '#f07818',
  '#6abe83',
  '#209396',
  '#00A0FF',
  '#4d80e4',
];
