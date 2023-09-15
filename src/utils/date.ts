import { LOCAL } from '@data-models/enums/date.enum.ts';

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isLastDayMonth = (date: Date) => {
  const month = date.getMonth();
  const dateLastDayMonth = new Date(date.getFullYear(), month + 1, 0);

  return dateLastDayMonth.getDate() === date.getDate();
};

export const isSameMonth = (date1: Date, date2: Date = new Date()) => {
  const date1Month = date1.getMonth();
  const date1Year = date1.getFullYear();
  const date2Month = date2.getMonth();
  const date2Year = date2.getFullYear();

  return date1Month === date2Month && date1Year === date2Year;
};

export const getEnMonthName = (date: Date) => {
  return date.toLocaleString(LOCAL.US, { month: 'short' });
};

export const getDateSting = (date: Date | string = new Date()) => {
  let baseDate = date;

  if (typeof baseDate === 'string') {
    baseDate = new Date(baseDate);
  }

  return `${baseDate.getFullYear()}-${
    baseDate.getMonth() + 1
  }-${baseDate.getDate()}`;
};
