import type { Task, TaskStatus, TaskPriority } from '../../types/task';

export function selectTasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

export function selectTaskById(tasks: Task[], id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export interface TaskStats {
  total: number;
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  completionRate: number;
  overdueCount: number;
}

export function selectStats(tasks: Task[]): TaskStats {
  const now = new Date().toISOString();

  const byStatus: Record<TaskStatus, number> = {
    todo: 0,
    'in-progress': 0,
    done: 0,
  };

  const byPriority: Record<TaskPriority, number> = {
    low: 0,
    medium: 0,
    high: 0,
  };

  let overdueCount = 0;

  for (const task of tasks) {
    byStatus[task.status]++;
    byPriority[task.priority]++;

    if (task.deadline !== null && task.deadline < now && task.status !== 'done') {
      overdueCount++;
    }
  }

  const total = tasks.length;
  const completionRate = total === 0 ? 0 : Math.round((byStatus.done / total) * 100);

  return { total, byStatus, byPriority, completionRate, overdueCount };
}
