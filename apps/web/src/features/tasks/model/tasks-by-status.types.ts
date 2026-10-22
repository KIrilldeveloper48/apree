import type { TTask } from '../api/types/task.types';
import type { TTaskStatus } from '../api/types/task-status.types';

export type TTasksByStatus = Readonly<Record<TTaskStatus, readonly TTask[]>>;
