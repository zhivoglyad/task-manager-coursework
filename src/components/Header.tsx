import { CheckSquare, LayoutDashboard, BarChart2, Sun, Moon, Plus } from 'lucide-react'
import { useThemeStore } from '../features/theme/themeStore'

interface HeaderProps {
  activeView: 'board' | 'stats'
  onViewChange: (view: 'board' | 'stats') => void
  onNewTask: () => void
}

export function Header({ activeView, onViewChange, onNewTask }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
          <CheckSquare size={24} className="text-indigo-500" />
          <span className="font-semibold text-lg">Task Manager</span>
        </div>

        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewChange('board')}
            aria-current={activeView === 'board' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
              activeView === 'board'
                ? 'bg-indigo-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Board</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('stats')}
            aria-current={activeView === 'stats' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
              activeView === 'stats'
                ? 'bg-indigo-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart2 size={16} />
            <span className="hidden sm:inline">Stats</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={onNewTask}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
