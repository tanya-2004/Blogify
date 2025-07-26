export const statusColors = {
  approved: {
    bg: 'bg-green-100',
    text: 'text-green-700'
  },
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700'
  },
  spam: {
    bg: 'bg-red-100',
    text: 'text-red-600'
  }
};

export const getStatusClasses = (status) => {
  const colors = statusColors[status] || {};
  return `${colors.bg || ''} ${colors.text || ''}`.trim();
};