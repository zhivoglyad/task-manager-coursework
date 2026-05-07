import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { enUS } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal } from '../../components/Modal'
import { useTaskStore } from './store'
import type { Task, TaskDraft, TaskPriority, TaskStatus } from '../../types/task'

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  taskToEdit?: Task | null
}

const LABEL_CLASS = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5'

const INPUT_BASE =
  'w-full px-3 py-2.5 rounded-lg border text-sm transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'

const BORDER_NORMAL = 'border-slate-300 dark:border-slate-600'
const BORDER_ERROR = 'border-rose-400 dark:border-rose-500 ring-1 ring-rose-400'

export function TaskForm({ isOpen, onClose, taskToEdit }: TaskFormProps) {
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [status, setStatus] = useState<TaskStatus>('todo')
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (isOpen && taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description)
      setPriority(taskToEdit.priority)
      setStatus(taskToEdit.status)
      setDeadline(taskToEdit.deadline ? new Date(taskToEdit.deadline) : null)
      setTouched(false)
    } else if (isOpen) {
      setTitle('')
      setDescription('')
      setPriority('medium')
      setStatus('todo')
      setDeadline(null)
      setTouched(false)
    }
  }, [taskToEdit, isOpen])

  const isValid = title.trim().length > 0

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return

    const draft: TaskDraft = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      deadline: deadline ? deadline.toISOString() : null,
    }

    if (taskToEdit) {
      updateTask(taskToEdit.id, draft)
    } else {
      addTask(draft)
    }

    onClose()
  }

  const titleBorder = touched && !isValid ? BORDER_ERROR : BORDER_NORMAL

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={taskToEdit ? 'Edit Task' : 'New Task'}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="task-title" className={LABEL_CLASS}>
            Title <span aria-hidden="true" className="text-rose-500">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            aria-required="true"
            aria-invalid={touched && !isValid}
            aria-describedby={touched && !isValid ? 'title-error' : undefined}
            className={`${INPUT_BASE} ${titleBorder}`}
          />
          {touched && !isValid && (
            <p id="title-error" role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
              Title is required
            </p>
          )}
        </div>

        <div>
          <label htmlFor="task-description" className={LABEL_CLASS}>
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={3}
            className={`${INPUT_BASE} ${BORDER_NORMAL} resize-none`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-priority" className={LABEL_CLASS}>
              Priority
            </label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className={`${INPUT_BASE} ${BORDER_NORMAL}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-status" className={LABEL_CLASS}>
              Status
            </label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className={`${INPUT_BASE} ${BORDER_NORMAL}`}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="task-deadline" className={LABEL_CLASS}>
            Deadline
          </label>
          <DatePicker
            id="task-deadline"
            selected={deadline}
            onChange={(date: Date | null) => setDeadline(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMM d, yyyy HH:mm"
            locale={enUS}
            placeholderText="Select date and time (optional)"
            isClearable
            autoComplete="off"
            className={`${INPUT_BASE} ${BORDER_NORMAL}`}
            wrapperClassName="w-full"
            calendarClassName="!font-sans"
            minDate={new Date()}
          />
        </div>

        <footer className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={touched && !isValid}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {taskToEdit ? 'Save' : 'Create'}
          </button>
        </footer>
      </form>
    </Modal>
  )
}
