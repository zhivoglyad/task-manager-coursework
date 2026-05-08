import { useState, useEffect } from 'react'
import { Search, X, ArrowUp, ArrowDown } from 'lucide-react'
import { useFiltersStore, DEFAULT_FILTERS } from '../features/tasks/filtersStore'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import type { TaskPriority } from '../types/task'
import type { TaskFilters } from '../features/tasks/filtersStore'

export function FiltersBar() {
  const filters = useFiltersStore((s) => s.filters)
  const setSearch = useFiltersStore((s) => s.setSearch)
  const setPriorityFilter = useFiltersStore((s) => s.setPriorityFilter)
  const setSortBy = useFiltersStore((s) => s.setSortBy)
  const setSortOrder = useFiltersStore((s) => s.setSortOrder)
  const resetFilters = useFiltersStore((s) => s.resetFilters)

  const [searchInput, setSearchInput] = useState(filters.search)
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch, setSearch])

  useEffect(() => {
    setSearchInput(filters.search)
  }, [filters.search])

  const isFiltered =
    filters.search !== DEFAULT_FILTERS.search ||
    filters.priority !== DEFAULT_FILTERS.priority ||
    filters.sortBy !== DEFAULT_FILTERS.sortBy ||
    filters.sortOrder !== DEFAULT_FILTERS.sortOrder

  const selectClassName =
    'px-3 py-2 rounded-lg border-2 text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors'

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border-2 text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
        />
        {searchInput && (
          <button
            type="button"
            onClick={() => setSearchInput('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={filters.priority}
        onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}
        className={selectClassName}
        aria-label="Filter by priority"
      >
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => setSortBy(e.target.value as TaskFilters['sortBy'])}
        className={selectClassName}
        aria-label="Sort by"
      >
        <option value="none">No sorting</option>
        <option value="createdAt">Created</option>
        <option value="deadline">Deadline</option>
        <option value="priority">Priority</option>
      </select>

      <button
        type="button"
        onClick={() => setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc')}
        className="p-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
        aria-label="Toggle sort order"
      >
        {filters.sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      </button>

      {isFiltered && (
        <button
          type="button"
          onClick={() => {
            resetFilters()
            setSearchInput('')
          }}
          className="px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 border-2 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  )
}
