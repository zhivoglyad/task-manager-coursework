import { describe, it, expect } from 'vitest'
import { applyFilters } from './useFilteredTasks'
import type { Task } from '../../types/task'

// TaskFilters shape mirrors filtersStore.TaskFilters
type Filters = Parameters<typeof applyFilters>[1]

const DEFAULT: Filters = {
  search: '',
  priority: 'all',
  sortBy: 'createdAt',
  sortOrder: 'asc',
}

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: Math.random().toString(),
    title: 'Task',
    description: '',
    priority: 'medium',
    status: 'todo',
    deadline: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

describe('applyFilters', () => {
  it('search finds by title case-insensitively', () => {
    const tasks = [makeTask({ title: 'Fix Bug' }), makeTask({ title: 'New Feature' })]
    const result = applyFilters(tasks, { ...DEFAULT, search: 'fix bug' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all).toHaveLength(1)
    expect(all[0].title).toBe('Fix Bug')
  })

  it('search finds by description', () => {
    const tasks = [
      makeTask({ title: 'Alpha', description: 'Critical hotfix needed' }),
      makeTask({ title: 'Beta', description: 'Minor improvement' }),
    ]
    const result = applyFilters(tasks, { ...DEFAULT, search: 'hotfix' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all).toHaveLength(1)
    expect(all[0].title).toBe('Alpha')
  })

  it('search returns empty when no match', () => {
    const tasks = [makeTask({ title: 'Foo' }), makeTask({ title: 'Bar' })]
    const result = applyFilters(tasks, { ...DEFAULT, search: 'zzznomatch' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all).toHaveLength(0)
  })

  it('priority filter high returns only high-priority tasks', () => {
    const tasks = [
      makeTask({ priority: 'high' }),
      makeTask({ priority: 'medium' }),
      makeTask({ priority: 'low' }),
    ]
    const result = applyFilters(tasks, { ...DEFAULT, priority: 'high' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all).toHaveLength(1)
    expect(all[0].priority).toBe('high')
  })

  it('priority all returns all tasks', () => {
    const tasks = [
      makeTask({ priority: 'high' }),
      makeTask({ priority: 'medium' }),
      makeTask({ priority: 'low' }),
    ]
    const result = applyFilters(tasks, { ...DEFAULT, priority: 'all' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all).toHaveLength(3)
  })

  it('deadline sort asc puts null deadlines last', () => {
    const tasks = [
      makeTask({ id: 'a', deadline: null }),
      makeTask({ id: 'b', deadline: '2025-01-01T00:00:00.000Z' }),
      makeTask({ id: 'c', deadline: '2025-06-01T00:00:00.000Z' }),
    ]
    const result = applyFilters(tasks, { ...DEFAULT, sortBy: 'deadline', sortOrder: 'asc' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all[0].id).toBe('b')
    expect(all[1].id).toBe('c')
    expect(all[2].id).toBe('a')
  })

  it('priority sort desc: high before medium before low', () => {
    const tasks = [
      makeTask({ id: 'lo', priority: 'low' }),
      makeTask({ id: 'hi', priority: 'high' }),
      makeTask({ id: 'md', priority: 'medium' }),
    ]
    const result = applyFilters(tasks, { ...DEFAULT, sortBy: 'priority', sortOrder: 'desc' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all[0].id).toBe('hi')
    expect(all[1].id).toBe('md')
    expect(all[2].id).toBe('lo')
  })

  it('priority sort asc: low before medium before high', () => {
    const tasks = [
      makeTask({ id: 'hi', priority: 'high' }),
      makeTask({ id: 'md', priority: 'medium' }),
      makeTask({ id: 'lo', priority: 'low' }),
    ]
    const result = applyFilters(tasks, { ...DEFAULT, sortBy: 'priority', sortOrder: 'asc' })
    const all = [...result.todo, ...result['in-progress'], ...result.done]
    expect(all[0].id).toBe('lo')
    expect(all[1].id).toBe('md')
    expect(all[2].id).toBe('hi')
  })
})
