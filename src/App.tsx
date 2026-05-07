import { useState } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { Header } from './components/Header'
import { TaskCard } from './features/tasks/TaskCard'
import type { Task } from './types/task'

const MOCK_TASK: Task = {
  id: 'mock-1',
  title: 'Design the landing page',
  description: 'Create wireframes and high-fidelity mockups for the new product landing page.',
  priority: 'high',
  status: 'in-progress',
  deadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export function App() {
  const [activeView, setActiveView] = useState<'board' | 'stats'>('board')

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <Header
          activeView={activeView}
          onViewChange={setActiveView}
          onNewTask={() => {}}
        />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeView === 'board' ? (
            <div className="max-w-sm">
              <TaskCard
                task={MOCK_TASK}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">Stats view coming soon</p>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}
