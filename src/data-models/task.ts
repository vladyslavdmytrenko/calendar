export interface TaskLabel {
  id: string;
  text: string;
  label: string;
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
  [key: number]: Task[];
}
