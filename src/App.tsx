import { useState } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { Header } from './components/Header'

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
            <p className="text-slate-500 dark:text-slate-400">Board view coming soon</p>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">Stats view coming soon</p>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}
