import type { TCreateTaskInput } from '../api/create-task-input.types';
import type { TTask } from '../api/task.types';
import type { TUpdateTaskInput } from '../api/update-task-input.types';
import type { TUpdateTaskStatusInput } from '../api/update-task-status-input.types';

import type { TTasksByStatus } from './tasks-by-status.types';

export type TUseTasksResult = Readonly<{
  tasks: readonly TTask[];
  tasksByStatus: TTasksByStatus;
  isLoading: boolean;
  isMutating: boolean;
  errorMessage: string | null;
  reload: () => Promise<void>;
  create: (input: TCreateTaskInput) => Promise<TTask>;
  update: (taskId: string, input: TUpdateTaskInput) => Promise<TTask>;
  updateStatus: (taskId: string, input: TUpdateTaskStatusInput) => Promise<TTask>;
  remove: (taskId: string) => Promise<void>;
}>;
