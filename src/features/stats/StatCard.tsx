import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  accent?: 'indigo' | 'amber' | 'emerald' | 'rose'
}

const accentMap = {
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/40',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
  },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  rose: {
    text: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
  },
} satisfies Record<NonNullable<StatCardProps['accent']>, { text: string; iconBg: string }>

const defaultAccent = {
  text: 'text-slate-900 dark:text-white',
  iconBg: 'bg-slate-100 dark:bg-slate-700',
}

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  const colors = accent ? accentMap[accent] : defaultAccent

  return (
    <article className="rounded-2xl p-5 border-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
        {icon && (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colors.iconBg} ${colors.text}`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
      <p className={`text-4xl font-bold mt-1 ${colors.text}`}>{value}</p>
    </article>
  )
}
