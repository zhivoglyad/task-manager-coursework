# Task Manager

A feature-rich Kanban-style task management application built as a university coursework project. Organize your work with drag-and-drop, track progress with interactive charts, and stay on top of deadlines.

<!-- Add screenshots here -->
> Screenshots: Add your own screenshots after running the app locally.

## Features

- Kanban board with three columns: To Do, In Progress, Done
- Drag-and-drop to move and reorder tasks (powered by @dnd-kit)
- Create and edit tasks with title, description, priority, status, and deadline
- Real-time search with debounce (searches title and description)
- Filter by priority (Low / Medium / High)
- Sort by creation date, deadline, or priority
- Statistics dashboard with charts (pie, bar, trend line)
- Dark / Light theme toggle, persisted across sessions
- All data persisted in localStorage — works offline, no backend needed
- Responsive design (mobile, tablet, desktop)
- Accessible: keyboard navigation, ARIA labels, focus management

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| State management | Zustand (with persist middleware) |
| Drag-and-drop | @dnd-kit/core + @dnd-kit/sortable |
| Charts | Recharts |
| Animations | Framer Motion |
| Date utilities | date-fns |
| Icons | lucide-react |
| Testing | Vitest + Testing Library |

## Getting Started

```bash
# Clone the repository
git clone <your-repo-url>
cd task-manager-coursework

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once and exit |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # App header with navigation and theme toggle
│   ├── FiltersBar.tsx   # Search, filter, and sort controls
│   ├── Modal.tsx        # Reusable modal wrapper (framer-motion)
│   ├── PriorityBadge.tsx
│   └── DeadlineLabel.tsx
├── features/
│   ├── tasks/           # Task domain
│   │   ├── store.ts     # Zustand store (tasks CRUD)
│   │   ├── filtersStore.ts  # Filters/sorting state
│   │   ├── selectors.ts     # Pure selector functions
│   │   ├── useFilteredTasks.ts  # Hook + pure applyFilters()
│   │   ├── Board.tsx    # Kanban board (DndContext)
│   │   ├── Column.tsx   # Droppable column
│   │   ├── SortableTaskCard.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskForm.tsx
│   ├── stats/           # Statistics dashboard
│   │   ├── StatsDashboard.tsx
│   │   ├── StatCard.tsx
│   │   ├── StatusPieChart.tsx
│   │   ├── PriorityBarChart.tsx
│   │   └── CompletionTrend.tsx
│   └── theme/
│       ├── themeStore.ts
│       └── ThemeProvider.tsx
├── hooks/
│   └── useDebouncedValue.ts
├── types/
│   └── task.ts          # Task, TaskDraft, TaskPriority, TaskStatus
├── utils/
│   ├── id.ts            # generateId() with crypto.randomUUID
│   └── storage.ts       # localStorage helpers
└── test/
    └── setup.ts         # @testing-library/jest-dom setup
```

## Architecture Notes

**State management:** Zustand was chosen over Redux or Context API for its minimal boilerplate and built-in `persist` middleware. The store is split into two slices: `useTaskStore` for task data and `useFiltersStore` for UI filter state. Both are persisted to localStorage independently.

**Selectors pattern:** Pure functions in `selectors.ts` compute derived data (stats, filtered lists) from raw state. They are framework-agnostic and easy to unit-test. The `applyFilters` function in `useFilteredTasks.ts` follows the same pattern — extracted from the hook so it can be tested without React.

**Feature-based structure:** Code is organized by feature (`tasks/`, `stats/`, `theme/`) rather than by type (components/, hooks/). Each feature folder owns its components, store slice, and hooks.

## Testing

Tests are written with Vitest and Testing Library. 24 tests across 5 test files:

```bash
pnpm test:run
```

Coverage:
- `storage.test.ts` — localStorage utility functions
- `store.test.ts` — Zustand store actions and selectors
- `useFilteredTasks.test.ts` — filter, search, and sort logic
- `PriorityBadge.test.tsx` — component rendering
- `TaskCard.test.tsx` — user interactions (edit, delete)

## License

MIT — free to use for educational purposes.
