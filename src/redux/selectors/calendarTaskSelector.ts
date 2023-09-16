import { RootState } from '@/redux/store.ts';
import { createSelector } from '@reduxjs/toolkit';

import { CalendarTaskSliceState } from '@/redux/reducers/CalendarTaskSlice.ts';

import { CalendarFilters } from '@/data-models';

export const selectCalendarState = (state: RootState) => state.calendarReducer;

export const selectCalendarTasks = ({
  timestamp,
  filters,
}: {
  timestamp: number;
  filters: CalendarFilters;
}) =>
  createSelector(selectCalendarState, (state: CalendarTaskSliceState) => {
    const result = state.tasks[timestamp] || [];

    return result
      .filter(task =>
        filters.title
          ? task.title.toLowerCase().includes(filters.title.toLowerCase())
          : true
      )
      .filter(task =>
        filters.labels.length
          ? task.labels?.some(task =>
              filters.labels.some(filterLabel => task.id === filterLabel.id)
            )
          : true
      );
  });

export const selectCalendarAllTask = createSelector(
  selectCalendarState,
  (state: CalendarTaskSliceState) => state.tasks
);

export const selectCalendarLabels = createSelector(
  selectCalendarState,
  (state: CalendarTaskSliceState) => state.labels
);

export const selectDragCard = createSelector(
  selectCalendarState,
  (state: CalendarTaskSliceState) => state.dragCard
);

export const selectCalendarFilters = createSelector(
  selectCalendarState,
  (state: CalendarTaskSliceState) => state.filters
);
