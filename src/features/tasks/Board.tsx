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
import { ListTodo, Search } from 'lucide-react'
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

  if (allTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ListTodo size={56} className="text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No tasks yet</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">
          Create your first task to get started
        </p>
      </div>
    )
  }

  const totalFiltered = STATUSES.reduce((sum, { status }) => sum + groupedTasks[status].length, 0)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {totalFiltered === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={40} className="text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No tasks match your filters
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Try adjusting the search or filters
          </p>
        </div>
      ) : (
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
      )}
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
