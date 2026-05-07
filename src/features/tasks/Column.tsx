import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableTaskCard } from './SortableTaskCard'
import type { Task, TaskStatus } from '../../types/task'

interface ColumnProps {
  status: TaskStatus
  title: string
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const TITLE_CLASS: Record<TaskStatus, string> = {
  todo: 'text-slate-600 dark:text-slate-400',
  'in-progress': 'text-indigo-600 dark:text-indigo-400',
  done: 'text-emerald-600 dark:text-emerald-400',
}

const BADGE_CLASS: Record<TaskStatus, string> = {
  todo: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  'in-progress': 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300',
  done: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
}

export function Column({ status, title, tasks, onEdit, onDelete }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div className="flex flex-col rounded-2xl bg-slate-100 dark:bg-slate-800/60 p-3 min-h-[300px]">
      <header className="flex items-center justify-between mb-3 px-1">
        <span
          className={`text-sm font-semibold uppercase tracking-wide ${TITLE_CLASS[status]}`}
        >
          {title}
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${BADGE_CLASS[status]}`}>
          {tasks.length}
        </span>
      </header>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col gap-3 flex-1 min-h-[100px]">
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600">
              <p className="text-sm text-slate-400 dark:text-slate-500">Drop here</p>
            </div>
          ) : (
            tasks.map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}
