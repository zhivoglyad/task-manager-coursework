import { describe, it, expect, beforeEach } from 'vitest'
import { useTaskStore } from './store'
import { selectStats } from './selectors'
import type { TaskDraft } from '../../types/task'

const DRAFT: TaskDraft = {
  title: 'Test task',
  description: 'desc',
  priority: 'medium',
  status: 'todo',
  deadline: null,
}

describe('task store', () => {
  beforeEach(() => {
    useTaskStore.getState().resetStore()
  })

  it('addTask creates a task with id and timestamps', () => {
    useTaskStore.getState().addTask(DRAFT)
    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(1)
    expect(tasks[0].id).toBeTruthy()
    expect(tasks[0].createdAt).toBeTruthy()
    expect(tasks[0].title).toBe('Test task')
  })

  it('updateTask merges fields and updates updatedAt', async () => {
    useTaskStore.getState().addTask(DRAFT)
    const before = useTaskStore.getState().tasks[0]
    await new Promise((r) => setTimeout(r, 5))
    useTaskStore.getState().updateTask(before.id, { title: 'Updated' })
    const after = useTaskStore.getState().tasks[0]
    expect(after.title).toBe('Updated')
    expect(after.id).toBe(before.id)
    expect(after.updatedAt).not.toBe(before.updatedAt)
  })

  it('deleteTask removes the task', () => {
    useTaskStore.getState().addTask(DRAFT)
    const id = useTaskStore.getState().tasks[0].id
    useTaskStore.getState().deleteTask(id)
    expect(useTaskStore.getState().tasks).toHaveLength(0)
  })

  it('moveTask changes status only', () => {
    useTaskStore.getState().addTask(DRAFT)
    const id = useTaskStore.getState().tasks[0].id
    useTaskStore.getState().moveTask(id, 'done')
    const task = useTaskStore.getState().tasks[0]
    expect(task.status).toBe('done')
    expect(task.title).toBe('Test task')
  })

  it('reorderTasks swaps positions', () => {
    useTaskStore.getState().addTask({ ...DRAFT, title: 'A' })
    useTaskStore.getState().addTask({ ...DRAFT, title: 'B' })
    const [a, b] = useTaskStore.getState().tasks
    useTaskStore.getState().reorderTasks(a.id, b.id)
    const reordered = useTaskStore.getState().tasks
    expect(reordered[0].title).toBe('B')
    expect(reordered[1].title).toBe('A')
  })

  it('selectStats counts correctly', () => {
    useTaskStore.getState().addTask({ ...DRAFT, status: 'todo', priority: 'high' })
    useTaskStore.getState().addTask({ ...DRAFT, status: 'done', priority: 'low' })
    useTaskStore.getState().addTask({ ...DRAFT, status: 'in-progress', priority: 'medium' })
    const stats = selectStats(useTaskStore.getState().tasks)
    expect(stats.total).toBe(3)
    expect(stats.byStatus.done).toBe(1)
    expect(stats.byPriority.high).toBe(1)
    expect(stats.completionRate).toBe(33)
  })
})
