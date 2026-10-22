import type { TTask } from '../api/types/task.types';
import type { TTaskPriority } from '../api/types/task-priority.types';

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
