import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { Task, TaskAction, TaskLabel, TaskList } from '@data-models/task.ts';
import { CalendarFilters, CalendarFiltersAction } from '@/data-models';
import {
  CALENDAR_FILTER_ACTION,
  CALENDAR_FILTER_TYPES,
} from '@data-models/enums/calendar.enum.ts';

export type CalendarTaskSliceState = {
  dragCard?: TaskAction<Task>;
  labels: TaskLabel[];
  tasks: TaskList;
  filters: CalendarFilters;
};

const initialState: CalendarTaskSliceState = {
  labels: [],
  tasks: {},
  filters: { labels: [] },
};

export const calendarTaskSlice = createSlice({
  name: 'calendar-task',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<TaskAction<Omit<Task, 'id' | 'order'>>>
    ) => {
      const newTask = { id: nanoid(), order: 0, ...action.payload.data };

      if (!state.tasks[action.payload.timestamp]) {
        state.tasks[action.payload.timestamp] = [newTask];
        return;
      }

      newTask.order = state.tasks[action.payload.timestamp].length;
      state.tasks[action.payload.timestamp].push(newTask);
    },

    removeTask: (state, action: PayloadAction<TaskAction<string>>) => {
      state.tasks[action.payload.timestamp] = state.tasks[
        action.payload.timestamp
      ].filter(task => task.id !== action.payload.data);
    },

    updateTask: (state, action: PayloadAction<TaskAction<Partial<Task>>>) => {
      const updateTaskIndex = state.tasks[action.payload.timestamp].findIndex(
        task => task.id === action.payload.data.id
      );

      state.tasks[action.payload.timestamp][updateTaskIndex] = {
        ...state.tasks[action.payload.timestamp][updateTaskIndex],
        ...action.payload.data,
      };
    },

    setDragCard: (state, action: PayloadAction<TaskAction<Task>>) => {
      state.dragCard = action.payload;
    },

    changeTaskPlace: (state, action: PayloadAction<TaskAction<Task>>) => {
      if (!state.dragCard) return;

      state.tasks[state.dragCard.timestamp] = state.tasks[
        state.dragCard.timestamp
      ].filter(task => task.id !== state.dragCard?.data.id);

      const dropIndex = state.tasks[action.payload.timestamp].findIndex(
        task => task.id === action.payload.data.id
      );

      if (dropIndex !== -1) {
        state.tasks[action.payload.timestamp].splice(
          dropIndex,
          0,
          state.dragCard.data
        );
      }
    },

    addLabel: (state, action: PayloadAction<TaskLabel>) => {
      state.labels.push(action.payload);
    },

    updateLabel: (state, action: PayloadAction<TaskLabel>) => {
      const updateTaskLabelIndex = state.labels.findIndex(
        task => task.id === action.payload.id
      );

      state.labels[updateTaskLabelIndex] = {
        ...action.payload,
      };
    },

    removeLabel: (state, action: PayloadAction<string>) => {
      state.labels = state.labels.filter(label => label.id !== action.payload);
      state.filters.labels = state.filters.labels.filter(
        label => label.id !== action.payload
      );
    },

    changeFilters: (state, action: PayloadAction<CalendarFiltersAction>) => {
      if (action.payload.type === CALENDAR_FILTER_TYPES.TITLE) {
        if (
          action.payload.action === CALENDAR_FILTER_ACTION.ADD &&
          typeof action.payload.data === 'string'
        ) {
          state.filters.title = action.payload.data;
        }

        return;
      }

      if (action.payload.type === CALENDAR_FILTER_TYPES.LABELS) {
        if (
          action.payload.action === CALENDAR_FILTER_ACTION.ADD &&
          typeof action.payload.data === 'object'
        ) {
          state.filters.labels.push(action.payload.data);
        }

        if (
          action.payload.action === CALENDAR_FILTER_ACTION.REMOVE &&
          typeof action.payload.data === 'object'
        ) {
          if ('id' in action.payload.data) {
            state.filters.labels = state.filters.labels.filter(
              label => label.id !== action.payload.data.id
            );
          }
        }
      }
    },
  },
});

export const calendarTaskActions = calendarTaskSlice.actions;
export default calendarTaskSlice.reducer;
