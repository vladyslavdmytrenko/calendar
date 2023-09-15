import { RootState } from '@/redux/store.ts';
import { createSelector } from '@reduxjs/toolkit';

import { CalendarTaskSliceState } from '@/redux/reducers/CalendarTaskSlice.ts';

export const selectCalendarState = (state: RootState) => state.calendarReducer;

export const selectCalendarTasks = (timestamp: number) =>
  createSelector(
    selectCalendarState,
    (state: CalendarTaskSliceState) => state.tasks[timestamp] || []
  );

export const selectCalendarLabels = createSelector(
  selectCalendarState,
  (state: CalendarTaskSliceState) => state.labels
);

export const selectDragCard = createSelector(
  selectCalendarState,
  (state: CalendarTaskSliceState) => state.dragCard
);
