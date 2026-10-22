import type { TTask } from '../api/task.types';
import type { TTaskPriority } from '../api/task-priority.types';

export function filterTasks(
  tasks: readonly TTask[],
  searchQuery: string,
  priority: TTaskPriority | null,
): readonly TTask[] {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearchQuery = task.title.toLowerCase().includes(normalizedSearchQuery);
    const matchesPriority = priority === null || task.priority === priority;

    return matchesSearchQuery && matchesPriority;
  });
}
