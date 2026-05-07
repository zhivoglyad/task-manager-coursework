import { useState } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { Header } from './components/Header'
import { TaskCard } from './features/tasks/TaskCard'
import { TaskForm } from './features/tasks/TaskForm'
import { useTaskStore } from './features/tasks/store'
import type { Task } from './types/task'

export function App() {
  const [activeView, setActiveView] = useState<'board' | 'stats'>('board')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const tasks = useTaskStore((s) => s.tasks)
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <Header
          activeView={activeView}
          onViewChange={setActiveView}
          onNewTask={handleNewTask}
        />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeView === 'board' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
                  <p className="text-lg font-medium">No tasks yet</p>
                  <p className="text-sm mt-1">Click "+ New Task" to get started</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
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
