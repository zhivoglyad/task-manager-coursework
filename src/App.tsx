import { useState } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { Header } from './components/Header'
import { Board } from './features/tasks/Board'
import { FiltersBar } from './components/FiltersBar'
import { TaskForm } from './features/tasks/TaskForm'
import { useTaskStore } from './features/tasks/store'
import type { Task } from './types/task'

export function App() {
  const [activeView, setActiveView] = useState<'board' | 'stats'>('board')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const deleteTask = useTaskStore((s) => s.deleteTask)

  function handleNewTask() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function handleEditTask(task: Task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  function handleCloseForm() {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-200 dark:bg-slate-900 transition-colors duration-200">
        <Header
          activeView={activeView}
          onViewChange={setActiveView}
          onNewTask={handleNewTask}
        />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeView === 'board' ? (
            <>
              <FiltersBar />
              <Board onEdit={handleEditTask} onDelete={deleteTask} />
            </>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">Stats view coming soon</p>
          )}
        </main>
        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          taskToEdit={editingTask}
        />
      </div>
    </ThemeProvider>
  )
}
