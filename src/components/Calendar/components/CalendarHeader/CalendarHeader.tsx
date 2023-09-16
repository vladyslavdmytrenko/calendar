import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import {
  CalendarFilterContainer,
  CalendarHeaderContainer,
  CalendarHeaderText,
  CalendarHeaderTitle,
} from '@components/Calendar/components/CalendarHeader/CalendarHeader.styled.tsx';
import { CalendarLabelsFilters } from '@components/Calendar/components/CalendarLablesFilter';
import { StyledInput } from '@components/InputField/InputField.styled.tsx';
import { useAppDispatch } from '@/redux/store.ts';
import { calendarTaskActions } from '@/redux/reducers/CalendarTaskSlice.ts';
import {
  CALENDAR_FILTER_ACTION,
  CALENDAR_FILTER_TYPES,
} from '@data-models/enums/calendar.enum.ts';

interface ICalendarHeader {}

export const CalendarHeader: FC<ICalendarHeader> = () => {
  const dispatch = useAppDispatch();
  const [titleFilterValue, setTitleFilterValue] = useState('');
  const refTimeoutId = useRef<NodeJS.Timeout>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleFilterValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (refTimeoutId.current) {
      clearTimeout(refTimeoutId.current);
    }
    refTimeoutId.current = setTimeout(() => {
      dispatch(
        calendarTaskActions.changeFilters({
          type: CALENDAR_FILTER_TYPES.TITLE,
          action: CALENDAR_FILTER_ACTION.ADD,
          data: titleFilterValue,
        })
      );
    }, 300);
  }, [dispatch, titleFilterValue]);

  return (
    <CalendarHeaderContainer>
      <CalendarHeaderTitle>Calendar</CalendarHeaderTitle>

      <CalendarFilterContainer>
        <CalendarHeaderText>Filter by labels</CalendarHeaderText>

        <CalendarLabelsFilters />
      </CalendarFilterContainer>

      <CalendarFilterContainer>
        <CalendarHeaderText>Filter by task title </CalendarHeaderText>

        <StyledInput onChange={handleChange} />
      </CalendarFilterContainer>
    </CalendarHeaderContainer>
  );
};
