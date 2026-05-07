import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskDraft, TaskStatus } from '../../types/task';
import { generateId } from '../../utils/id';

function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const result = array.slice();
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

interface TaskState {
  tasks: Task[];
}

interface TaskActions {
  addTask: (draft: TaskDraft) => void;
  updateTask: (id: string, updates: Partial<TaskDraft>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  reorderTasks: (activeId: string, overId: string) => void;
  resetStore: () => void;
}

export const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (draft) => {
        const now = new Date().toISOString();
        const task: Task = {
          ...draft,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },

      moveTask: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      reorderTasks: (activeId, overId) => {
        set((state) => {
          const from = state.tasks.findIndex((t) => t.id === activeId);
          const to = state.tasks.findIndex((t) => t.id === overId);
          if (from === -1 || to === -1) return state;
          return { tasks: arrayMove(state.tasks, from, to) };
        });
      },

      resetStore: () => set({ tasks: [] }),
    }),
    { name: 'task-manager:tasks' }
  )
);
