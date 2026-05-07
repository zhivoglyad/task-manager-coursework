import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TaskPriority } from '../../types/task'

export interface TaskFilters {
  search: string
  priority: TaskPriority | 'all'
  sortBy: 'createdAt' | 'deadline' | 'priority'
  sortOrder: 'asc' | 'desc'
}

export const DEFAULT_FILTERS: TaskFilters = {
  search: '',
  priority: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
}

interface FiltersState {
  filters: TaskFilters
  setSearch: (search: string) => void
  setPriorityFilter: (priority: TaskPriority | 'all') => void
  setSortBy: (sortBy: TaskFilters['sortBy']) => void
  setSortOrder: (sortOrder: 'asc' | 'desc') => void
  resetFilters: () => void
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      filters: DEFAULT_FILTERS,
      setSearch: (search) => set((s) => ({ filters: { ...s.filters, search } })),
      setPriorityFilter: (priority) => set((s) => ({ filters: { ...s.filters, priority } })),
      setSortBy: (sortBy) => set((s) => ({ filters: { ...s.filters, sortBy } })),
      setSortOrder: (sortOrder) => set((s) => ({ filters: { ...s.filters, sortOrder } })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),
    }),
    { name: 'task-manager:filters' }
  )
)
