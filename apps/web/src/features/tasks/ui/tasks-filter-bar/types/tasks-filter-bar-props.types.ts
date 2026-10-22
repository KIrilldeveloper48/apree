import type { TTaskPriority } from '../../../api/types/task-priority.types';

export interface ITasksFilterBarProps {
  readonly isFiltering: boolean;
  readonly onClear: () => void;
  readonly onSearchQueryChange: (searchQuery: string) => void;
  readonly onPriorityChange: (priority: TTaskPriority | null) => void;
  readonly priority: TTaskPriority | null;
  readonly searchQuery: string;
}
