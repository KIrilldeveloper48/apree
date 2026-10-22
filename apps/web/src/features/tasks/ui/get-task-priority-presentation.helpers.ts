import type { TTaskPriority } from '../api/task-priority.types';

import type { TTaskPriorityPresentation } from './task-priority-presentation.types';

export function getTaskPriorityPresentation(priority: TTaskPriority): TTaskPriorityPresentation {
  switch (priority) {
    case 'LOW':
      return { label: 'Низкий', color: 'success' };
    case 'MEDIUM':
      return { label: 'Средний', color: 'warning' };
    case 'HIGH':
      return { label: 'Высокий', color: 'error' };
  }
}
