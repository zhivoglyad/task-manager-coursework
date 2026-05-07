import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { TaskStatus } from '../../types/task'

interface StatusPieChartProps {
  byStatus: Record<TaskStatus, number>
}

const allSlices = [
  { name: 'To Do', key: 'todo' as TaskStatus, fill: '#6366f1' },
  { name: 'In Progress', key: 'in-progress' as TaskStatus, fill: '#f59e0b' },
  { name: 'Done', key: 'done' as TaskStatus, fill: '#10b981' },
]

export function StatusPieChart({ byStatus }: StatusPieChartProps) {
  const data = allSlices
    .map((s) => ({ name: s.name, value: byStatus[s.key], fill: s.fill }))
    .filter((s) => s.value > 0)

  return (
    <section className="rounded-2xl p-5 border-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Tasks by Status</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, '']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  )
}
