import { createSlice } from '@reduxjs/toolkit';

export type CalendarSliceState = {
  date: Date;
  days: string[];
};

const initialState: CalendarSliceState = {
  date: new Date(),
  days: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
});

export const { actions } = calendarSlice;
export default calendarSlice.reducer;
