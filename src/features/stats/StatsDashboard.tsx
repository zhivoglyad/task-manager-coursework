import { CheckSquare, Clock, TrendingUp, AlertCircle, BarChart2 } from 'lucide-react'
import { useTaskStore } from '../tasks/store'
import { selectStats } from '../tasks/selectors'
import { StatCard } from './StatCard'
import { StatusPieChart } from './StatusPieChart'
import { PriorityBarChart } from './PriorityBarChart'
import { CompletionTrend } from './CompletionTrend'

export function StatsDashboard() {
  const tasks = useTaskStore((s) => s.tasks)
  const stats = selectStats(tasks)

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <BarChart2 size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No data yet</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Create your first task to see statistics
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Statistics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Tasks" value={stats.total} icon={<CheckSquare size={20} />} />
        <StatCard
          label="In Progress"
          value={stats.byStatus['in-progress']}
          icon={<Clock size={20} />}
          accent="indigo"
        />
        <StatCard
          label="Done"
          value={stats.byStatus.done}
          icon={<TrendingUp size={20} />}
          accent="emerald"
        />
        <StatCard
          label="Overdue"
          value={stats.overdueCount}
          icon={<AlertCircle size={20} />}
          accent="rose"
        />
        <StatCard
          label="Completion"
          value={`${stats.completionRate}%`}
          icon={<BarChart2 size={20} />}
          accent="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusPieChart byStatus={stats.byStatus} />
        <PriorityBarChart tasks={tasks} />
      </div>

      <CompletionTrend tasks={tasks} />
    </div>
  )
}
