import { FC, useState } from 'react';

import {
  CalendarDayName,
  DayContainer,
} from '@components/Calendar/Calendar.styled.tsx';
import { CalendarDay } from '@components/Calendar/components/CalendarDay';
import { CalendarHeader } from '@components/Calendar/components/CalendarHeader';

import {
  generateDateListByRange,
  getDateRangeByDate,
} from '@utils/calendar.ts';
import { getDateSting } from '@utils/date.ts';

import { WEEK_DAYS } from '@/constants';

interface ICalendar {}

export const Calendar: FC<ICalendar> = () => {
  const [selectedDate] = useState(new Date(getDateSting()));

  const selectedRange = getDateRangeByDate(new Date(selectedDate));
  const listDate = generateDateListByRange(selectedRange);

  return (
    <>
      <CalendarHeader />

      <DayContainer>
        {WEEK_DAYS.map(day => (
          <CalendarDayName key={day}>{day}</CalendarDayName>
        ))}
      </DayContainer>

      <DayContainer>
        {listDate.map(({ date }) => (
          <CalendarDay
            key={date.toString()}
            dayDate={date}
            selectedDate={selectedDate}
          />
        ))}
      </DayContainer>
    </>
  );
};
