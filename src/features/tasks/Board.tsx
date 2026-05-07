import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useTaskStore } from './store'
import { useFilteredTasks } from './useFilteredTasks'
import { Column } from './Column'
import { TaskCard } from './TaskCard'
import type { Task, TaskStatus } from '../../types/task'

interface BoardProps {
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const STATUSES: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'To Do' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'done', title: 'Done' },
]

const VALID_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'done']

export function Board({ onEdit, onDelete }: BoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const allTasks = useTaskStore((s) => s.tasks)
  const moveTask = useTaskStore((s) => s.moveTask)
  const reorderTasks = useTaskStore((s) => s.reorderTasks)
  const groupedTasks = useFilteredTasks()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragStart(event: DragStartEvent) {
    const found = allTasks.find((t) => t.id === event.active.id)
    setActiveTask(found ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const dragged = allTasks.find((t) => t.id === activeId)
    if (!dragged) return

    if (VALID_STATUSES.includes(overId as TaskStatus)) {
      if (dragged.status !== overId) {
        moveTask(activeId, overId as TaskStatus)
      }
      return
    }

    const overTask = allTasks.find((t) => t.id === overId)
    if (!overTask) return

    if (dragged.status !== overTask.status) {
      moveTask(activeId, overTask.status)
    } else if (activeId !== overId) {
      reorderTasks(activeId, overId)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STATUSES.map(({ status, title }) => (
          <Column
            key={status}
            status={status}
            title={title}
            tasks={groupedTasks[status]}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2 scale-105 opacity-90">
            <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
