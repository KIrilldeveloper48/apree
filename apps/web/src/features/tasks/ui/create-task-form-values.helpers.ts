import type { TCreateTaskInput } from '../api/create-task-input.types';
import type { TTask } from '../api/task.types';

export function createTaskFormValues(task: TTask | null): TCreateTaskInput {
  if (task === null) {
    return {
      title: '',
      description: '',
      priority: 'MEDIUM',
    };
  }

  return {
    title: task.title,
    description: task.description,
    priority: task.priority,
  };
}
