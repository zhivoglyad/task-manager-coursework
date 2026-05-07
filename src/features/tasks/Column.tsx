import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnimatePresence, motion } from 'framer-motion'
import { SortableTaskCard } from './SortableTaskCard'
import type { Task, TaskStatus } from '../../types/task'

interface ColumnProps {
  status: TaskStatus
  title: string
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const COLUMN_CLASS: Record<TaskStatus, string> = {
  todo: 'bg-slate-50 border-slate-300 dark:bg-slate-800/60 dark:border-slate-700',
  'in-progress': 'bg-indigo-50 border-indigo-200 dark:bg-slate-800/60 dark:border-slate-700',
  done: 'bg-emerald-50 border-emerald-200 dark:bg-slate-800/60 dark:border-slate-700',
}

const TITLE_CLASS: Record<TaskStatus, string> = {
  todo: 'text-slate-700 dark:text-slate-400',
  'in-progress': 'text-indigo-700 dark:text-indigo-400',
  done: 'text-emerald-700 dark:text-emerald-400',
}

const BADGE_CLASS: Record<TaskStatus, string> = {
  todo: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  'in-progress': 'bg-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
  done: 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
}

const EMPTY_BORDER: Record<TaskStatus, string> = {
  todo: 'border-slate-300 text-slate-400',
  'in-progress': 'border-indigo-300 text-indigo-400',
  done: 'border-emerald-300 text-emerald-400',
}

export function Column({ status, title, tasks, onEdit, onDelete }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div
      className={`flex flex-col rounded-2xl border-2 p-3 min-h-[300px] transition-shadow ${COLUMN_CLASS[status]} ${
        isOver ? 'ring-2 ring-indigo-400 dark:ring-indigo-500 ring-offset-2' : ''
      }`}
    >
      <header className="flex items-center justify-between mb-3 px-1">
        <span className={`text-sm font-bold uppercase tracking-wider ${TITLE_CLASS[status]}`}>
          {title}
        </span>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${BADGE_CLASS[status]}`}>
          {tasks.length}
        </span>
      </header>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col gap-3 flex-1 min-h-[100px]">
          {tasks.length === 0 ? (
            <div
              className={`flex items-center justify-center h-20 rounded-xl border-2 border-dashed ${EMPTY_BORDER[status]}`}
            >
              <p className="text-sm font-medium">Drop here</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                >
                  <SortableTaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
