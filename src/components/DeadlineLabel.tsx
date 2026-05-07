import { parseISO, isPast, isWithinInterval, addHours, format } from 'date-fns'
import { AlertCircle, Clock, Calendar } from 'lucide-react'
import type { TaskStatus } from '../types/task'

export function DeadlineLabel({
  deadline,
  status,
}: {
  deadline: string | null
  status: TaskStatus
}) {
  if (deadline === null) return null

  const date = parseISO(deadline)
  const now = new Date()

  if (isPast(date) && status !== 'done') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
        <AlertCircle size={12} aria-hidden="true" />
        Overdue · {format(date, 'MMM d')}
      </span>
    )
  }

  if (isWithinInterval(date, { start: now, end: addHours(now, 24) })) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
        <Clock size={12} aria-hidden="true" />
        {format(date, 'MMM d')}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
      <Calendar size={12} aria-hidden="true" />
      {format(date, 'MMM d')}
    </span>
  )
}
