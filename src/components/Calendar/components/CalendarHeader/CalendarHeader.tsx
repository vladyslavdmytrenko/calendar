import { FC } from 'react';

import {
  CalendarHeaderContainer,
  CalendarHeaderTitle,
} from '@components/Calendar/components/CalendarHeader/CalendarHeader.styled.tsx';

interface ICalendarHeader {}

export const CalendarHeader: FC<ICalendarHeader> = () => {
  return (
    <CalendarHeaderContainer>
      <CalendarHeaderTitle>Calendar</CalendarHeaderTitle>
    </CalendarHeaderContainer>
  );
};
