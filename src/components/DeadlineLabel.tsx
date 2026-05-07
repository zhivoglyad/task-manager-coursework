import { parseISO, isPast, isWithinInterval, addHours, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
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
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2.5 py-1 rounded-full">
        <AlertCircle size={13} aria-hidden="true" />
        Overdue · {format(date, 'MMM d', { locale: enUS })}
      </span>
    )
  }

  if (isWithinInterval(date, { start: now, end: addHours(now, 24) })) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2.5 py-1 rounded-full">
        <Clock size={13} aria-hidden="true" />
        {format(date, 'MMM d', { locale: enUS })}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">
      <Calendar size={13} aria-hidden="true" />
      {format(date, 'MMM d', { locale: enUS })}
    </span>
  )
}
