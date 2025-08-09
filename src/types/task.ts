export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export type TaskStore = {
  tasks: Task[];
  load: () => Promise<void>;
  addOrUpdate: (task: Task) => Promise<void>;
  toggle: (id: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
};