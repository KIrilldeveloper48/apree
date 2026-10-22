import type { TTask } from '../api/task.types';
import type { TTaskStatus } from '../api/task-status.types';

export type TTasksByStatus = Readonly<Record<TTaskStatus, readonly TTask[]>>;
