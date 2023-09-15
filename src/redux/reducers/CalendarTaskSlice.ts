import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { Task, TaskAction, TaskLabel, TaskList } from '@data-models/task.ts';

export type CalendarTaskSliceState = {
  dragCard?: TaskAction<Task>;
  labels?: TaskLabel[];
  tasks: TaskList;
};

const initialState: CalendarTaskSliceState = {
  labels: [],
  tasks: {},
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
  },
});

export const calendarTaskActions = calendarTaskSlice.actions;
export default calendarTaskSlice.reducer;
