import { Pencil, Trash2 } from 'lucide-react'
import { PriorityBadge } from '../../components/PriorityBadge'
import { DeadlineLabel } from '../../components/DeadlineLabel'
import type { Task } from '../../types/task'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  function handleDelete() {
    if (window.confirm('Delete this task?')) {
      onDelete(task.id)
    }
  }

  return (
    <article className="group relative rounded-xl p-4 border transition-all duration-200 cursor-grab active:cursor-grabbing bg-white border-slate-200 hover:shadow-md hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:shadow-slate-900/50">
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
          className="p-1.5 rounded-md text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
        >
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Delete task: ${task.title}`}
          className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>

      <h3 className="font-semibold text-[15px] text-slate-900 dark:text-slate-50 line-clamp-2 pr-14">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <PriorityBadge priority={task.priority} />
        <DeadlineLabel deadline={task.deadline} status={task.status} />
      </div>
    </article>
  )
}
