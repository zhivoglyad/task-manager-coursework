import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { Task, TaskPriority } from '../../types/task'

interface PriorityBarChartProps {
  tasks: Task[]
}

const priorities: { key: TaskPriority; label: string }[] = [
  { key: 'low', label: 'Low' },
  { key: 'medium', label: 'Medium' },
  { key: 'high', label: 'High' },
]

export function PriorityBarChart({ tasks }: PriorityBarChartProps) {
  const data = priorities.map(({ key, label }) => ({
    name: label,
    todo: tasks.filter((t) => t.priority === key && t.status === 'todo').length,
    'in-progress': tasks.filter((t) => t.priority === key && t.status === 'in-progress').length,
    done: tasks.filter((t) => t.priority === key && t.status === 'done').length,
  }))

  return (
    <section className="rounded-2xl p-5 border-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Tasks by Priority</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="todo" name="To Do" stackId="a" fill="#6366f1" />
          <Bar dataKey="in-progress" name="In Progress" stackId="a" fill="#f59e0b" />
          <Bar dataKey="done" name="Done" stackId="a" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
