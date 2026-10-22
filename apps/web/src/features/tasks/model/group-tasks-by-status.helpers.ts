import type { TTask } from '../api/task.types';

import type { TTasksByStatus } from './tasks-by-status.types';

export function groupTasksByStatus(tasks: readonly TTask[]): TTasksByStatus {
  const newTasks: TTask[] = [];
  const inProgressTasks: TTask[] = [];
  const doneTasks: TTask[] = [];

  for (const task of tasks) {
    switch (task.status) {
      case 'NEW':
        newTasks.push(task);
        break;
      case 'IN_PROGRESS':
        inProgressTasks.push(task);
        break;
      case 'DONE':
        doneTasks.push(task);
        break;
    }
  }

  return {
    NEW: newTasks,
    IN_PROGRESS: inProgressTasks,
    DONE: doneTasks,
  };
}
