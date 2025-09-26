import dayjs from 'dayjs';

export const formatDate = (
  date: string | Date,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(date).format(format);
};

export const formatDateToMMDDYYYY = (date: string | Date, fallback = '') => {
  if (!date) return fallback;
  return formatDate(date, 'MMM DD, YYYY');
};
