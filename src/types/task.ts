export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
}

export type TaskDraft = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
