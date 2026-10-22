import type { TCreateTaskInput } from '../../../api/types/create-task-input.types';
import type { TTask } from '../../../api/types/task.types';
import type { TTaskStatus } from '../../../api/types/task-status.types';

export function createTaskFormValues(
  task: TTask | null,
  initialStatus: TTaskStatus,
): TCreateTaskInput {
  if (task === null) {
    return {
      title: '',
      description: '',
      priority: 'MEDIUM',
      status: initialStatus,
    };
  }

  return {
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  };
}
