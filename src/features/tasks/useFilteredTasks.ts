import { useMemo } from 'react'
import { useTaskStore } from './store'
import { useFiltersStore } from './filtersStore'
import type { Task, TaskStatus, TaskPriority } from '../../types/task'

const PRIORITY_ORDER: Record<string, number> = { high: 3, medium: 2, low: 1 }

export function applyFilters(
  tasks: Task[],
  filters: {
    search: string
    priority: TaskPriority | 'all'
    sortBy: 'createdAt' | 'deadline' | 'priority'
    sortOrder: 'asc' | 'desc'
  }
): Record<TaskStatus, Task[]> {
  let result = tasks

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    )
  }

  if (filters.priority !== 'all') {
    result = result.filter((t) => t.priority === filters.priority)
  }

  result = [...result].sort((a, b) => {
    let cmp = 0
    if (filters.sortBy === 'createdAt') {
      cmp = a.createdAt.localeCompare(b.createdAt)
    } else if (filters.sortBy === 'deadline') {
      if (!a.deadline && !b.deadline) cmp = 0
      else if (!a.deadline) cmp = 1
      else if (!b.deadline) cmp = -1
      else cmp = a.deadline.localeCompare(b.deadline)
    } else if (filters.sortBy === 'priority') {
      cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    }
    return filters.sortOrder === 'asc' ? cmp : -cmp
  })

  const grouped: Record<TaskStatus, Task[]> = { todo: [], 'in-progress': [], done: [] }
  for (const task of result) {
    grouped[task.status].push(task)
  }
  return grouped
}

export function useFilteredTasks(): Record<TaskStatus, Task[]> {
  const tasks = useTaskStore((s) => s.tasks)
  const { filters } = useFiltersStore()

  return useMemo(() => applyFilters(tasks, filters), [tasks, filters])
}
