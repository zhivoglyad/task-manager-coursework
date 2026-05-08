import type { TaskPriority } from '../types/task'

const variantMap: Record<TaskPriority, string> = {
  low: 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200',
  medium: 'bg-amber-200 text-amber-800 dark:bg-amber-800/60 dark:text-amber-300',
  high: 'bg-rose-200 text-rose-800 dark:bg-rose-800/60 dark:text-rose-300',
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${variantMap[priority]}`}
    >
      <span className="w-2 h-2 rounded-full bg-current" aria-hidden="true" />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  )
}
