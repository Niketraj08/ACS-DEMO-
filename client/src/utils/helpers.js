export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

export const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `/uploads/${url}`;
};

export const truncate = (str, len = 120) => {
  if (!str) return '';
  return str.length > len ? `${str.slice(0, len)}...` : str;
};
