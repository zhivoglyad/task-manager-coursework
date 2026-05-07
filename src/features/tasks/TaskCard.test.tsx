import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TaskCard } from './TaskCard'
import type { Task } from '../../types/task'

const MOCK_TASK: Task = {
  id: 'test-id',
  title: 'My Task',
  description: 'Some description',
  priority: 'high',
  status: 'todo',
  deadline: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

describe('TaskCard', () => {
  beforeEach(() => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
  })

  it('renders task title', () => {
    render(<TaskCard task={MOCK_TASK} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('My Task')).toBeInTheDocument()
  })

  it('calls onDelete with task id when delete confirmed', async () => {
    const onDelete = vi.fn()
    render(<TaskCard task={MOCK_TASK} onEdit={vi.fn()} onDelete={onDelete} />)
    await userEvent.click(screen.getByLabelText('Delete task: My Task'))
    expect(onDelete).toHaveBeenCalledWith('test-id')
  })

  it('calls onEdit with task when edit clicked', async () => {
    const onEdit = vi.fn()
    render(<TaskCard task={MOCK_TASK} onEdit={onEdit} onDelete={vi.fn()} />)
    await userEvent.click(screen.getByLabelText('Edit task: My Task'))
    expect(onEdit).toHaveBeenCalledWith(MOCK_TASK)
  })
})
