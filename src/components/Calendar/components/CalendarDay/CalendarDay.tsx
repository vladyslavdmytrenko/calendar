import { FC } from 'react';

import { CalendarDayContainer } from './CalendarDay.styled.tsx';

interface ICalendarDay {}
export const CalendarDay: FC<ICalendarDay> = () => {
  return <CalendarDayContainer></CalendarDayContainer>;
};
