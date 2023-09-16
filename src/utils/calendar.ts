import { CalendarDay, CalendarRange } from '@/data-models';
import { isSameDay } from '@utils/date.ts';

export const getDateRangeByDate = (date: Date = new Date()): CalendarRange => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  startDate.setDate(
    startDate.getDate() - (startDate.getDay() === 0 ? 7 : startDate.getDay())
  );

  if (endDate.getDay() !== 0) {
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));
  }

  return { startDate, endDate };
};

export const generateDateListByRange = ({
  startDate,
  endDate,
}: CalendarRange) => {
  const tempStartDate = startDate;
  const days: CalendarDay[] = [];

  do {
    tempStartDate.setDate(tempStartDate.getDate() + 1);
    days.push({
      date: new Date(tempStartDate.getTime()),
    });
  } while (!isSameDay(tempStartDate, endDate));

  return days;
};

export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
