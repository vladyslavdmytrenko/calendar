import {
  CALENDAR_FILTER_ACTION,
  CALENDAR_FILTER_TYPES,
} from '@data-models/enums/calendar.enum.ts';
import { TaskLabel } from '@data-models/task.ts';

export interface CalendarRange {
  startDate: Date;
  endDate: Date;
}

export interface CalendarDay {
  date: Date;
}

export interface CalendarFilters {
  title?: string;
  labels: TaskLabel[];
}

export interface CalendarFiltersAction {
  type: CALENDAR_FILTER_TYPES;
  action: CALENDAR_FILTER_ACTION;
  data: TaskLabel | string;
}
