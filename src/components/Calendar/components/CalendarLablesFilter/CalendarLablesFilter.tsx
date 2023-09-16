import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  CalendarLabelsFiltersContainer,
  CalendarLabelsFiltersOption,
  CalendarLabelsFiltersOptionContainer,
  CalendarLabelsFiltersSelect,
} from '@components/Calendar/components/CalendarLablesFilter/CalendarLablesFilter.styled.tsx';

import {
  selectCalendarFilters,
  selectCalendarLabels,
} from '@/redux/selectors/calendarTaskSelector.ts';
import { useAppDispatch } from '@/redux/store.ts';
import { calendarTaskActions } from '@/redux/reducers/CalendarTaskSlice.ts';

import {
  CALENDAR_FILTER_ACTION,
  CALENDAR_FILTER_TYPES,
} from '@data-models/enums/calendar.enum.ts';
import { TaskLabel } from '@data-models/task.ts';

interface ICalendarLabelsFilters {}
export const CalendarLabelsFilters: FC<ICalendarLabelsFilters> = () => {
  const labels = useSelector(selectCalendarLabels);
  const calendarFilters = useSelector(selectCalendarFilters);
  const dispatch = useAppDispatch();

  const selectText =
    calendarFilters.labels.length === 1
      ? calendarFilters.labels[0].title
      : calendarFilters.labels.length >= 2
      ? `Selected ${calendarFilters.labels.length}`
      : 'select';

  const [isOpenSelector, setIsOpenSelector] = useState(false);

  const handleOptionClick = (task: TaskLabel) => () => {
    if (calendarFilters.labels.findIndex(item => item.id === task.id) === -1) {
      dispatch(
        calendarTaskActions.changeFilters({
          action: CALENDAR_FILTER_ACTION.ADD,
          type: CALENDAR_FILTER_TYPES.LABELS,
          data: task,
        })
      );

      return;
    }

    dispatch(
      calendarTaskActions.changeFilters({
        action: CALENDAR_FILTER_ACTION.REMOVE,
        type: CALENDAR_FILTER_TYPES.LABELS,
        data: task,
      })
    );
  };
  const changeIsOpen = (isOpen: boolean) => setIsOpenSelector(isOpen);

  return (
    <CalendarLabelsFiltersContainer>
      <CalendarLabelsFiltersSelect
        onClick={() => changeIsOpen(!isOpenSelector)}
      >
        {selectText}
      </CalendarLabelsFiltersSelect>

      <CalendarLabelsFiltersOptionContainer isShow={isOpenSelector}>
        {labels.map(label => (
          <CalendarLabelsFiltersOption
            isSelected={
              calendarFilters.labels.findIndex(item => item.id === label.id) !==
              -1
            }
            key={label.id}
            color={label.color}
            onClick={handleOptionClick(label)}
          >
            {label.title}
          </CalendarLabelsFiltersOption>
        ))}
      </CalendarLabelsFiltersOptionContainer>
    </CalendarLabelsFiltersContainer>
  );
};
