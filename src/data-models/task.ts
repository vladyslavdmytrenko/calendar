export interface TaskLabel {
  id: string;
  title: string;
  color: string;
}
export interface Task {
  id: string;
  order: number;
  title: string;
  labels?: TaskLabel[];
}

export interface TaskAction<T> {
  timestamp: number;
  data: T;
}

export interface TaskList {
  [key: string]: Task[];
}
