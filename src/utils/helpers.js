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
  '#FF2E63',
  '#f07818',
  '#209396',
  '#00A0FF',
  '#4d80e4',
].map((hex) => hex.toLowerCase());
