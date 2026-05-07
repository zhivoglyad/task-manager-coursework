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
    <article className="group relative rounded-2xl p-5 border-2 transition-all duration-200 cursor-grab active:cursor-grabbing bg-white border-slate-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-0.5 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-indigo-500/50 dark:hover:shadow-indigo-950/40">
      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          type="button"
          onClick={() => onEdit(task)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Edit task: ${task.title}`}
          className="p-2 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors"
        >
          <Pencil size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Delete task: ${task.title}`}
          className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/40 transition-colors"
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>

      <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 pr-20 leading-snug">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <PriorityBadge priority={task.priority} />
        <DeadlineLabel deadline={task.deadline} status={task.status} />
      </div>
    </article>
  )
}
