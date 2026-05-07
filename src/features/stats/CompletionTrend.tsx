import { subDays, format, isSameDay, parseISO } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { Task } from '../../types/task'

interface CompletionTrendProps {
  tasks: Task[]
}

export function CompletionTrend({ tasks }: CompletionTrendProps) {
  const today = new Date()

  const days = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(today, 13 - i)
    return {
      date: format(date, 'MMM d'),
      created: tasks.filter((t) => isSameDay(parseISO(t.createdAt), date)).length,
      completed: tasks.filter(
        (t) => t.status === 'done' && isSameDay(parseISO(t.updatedAt), date),
      ).length,
    }
  })

  return (
    <section className="rounded-2xl p-5 border-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
        14-Day Completion Trend
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={days} margin={{ top: 4, right: 8, left: -8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={1} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="created"
            name="Created"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            name="Completed"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
