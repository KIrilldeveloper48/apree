import type { TTaskStatus } from '../../../api/task-status.types';

import type { TTaskStatusPresentation } from '../types/task-status-presentation.types';

export function getTaskStatusPresentation(status: TTaskStatus): TTaskStatusPresentation {
  switch (status) {
    case 'NEW':
      return { label: 'Новая', color: 'info' };
    case 'IN_PROGRESS':
      return { label: 'В работе', color: 'warning' };
    case 'DONE':
      return { label: 'Готово', color: 'success' };
  }
}
