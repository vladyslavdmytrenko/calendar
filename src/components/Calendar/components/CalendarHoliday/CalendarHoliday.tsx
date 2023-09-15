import { FC } from 'react';

import { useNextPublicHolidaysWorldwideQuery } from '@/redux/api/countryAPI.ts';

import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';
import {
  CalendarHolidayContainer,
  CalendarHolidayContent,
  CalendarHolidayItem,
} from '@components/Calendar/components/CalendarHoliday/CalnedarHoliday.styled.tsx';

export interface ICalendarTask {
  timestamp: number;
}

export const CalendarHoliday: FC<ICalendarTask> = ({ timestamp }) => {
  const { data } = useNextPublicHolidaysWorldwideQuery(undefined);
  const holidayList = data?.[timestamp];

  if (!holidayList) return null;

  return (
    <CalendarHolidayContainer>
      {holidayList.map(holiday => (
        <CalendarHolidayItem key={`${holiday.name}_${holiday.countryCode}`}>
          <CalendarHolidayContent>{holiday.name}</CalendarHolidayContent>

          <CalendarHolidayContent>
            {EMOJI_SYMBOLS.HOLIDAY}
            {holiday.countryCode}
          </CalendarHolidayContent>
        </CalendarHolidayItem>
      ))}
    </CalendarHolidayContainer>
  );
};
