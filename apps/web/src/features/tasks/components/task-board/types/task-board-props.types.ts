import type { TTask } from '../../../api/task.types';
import type { TTaskStatus } from '../../../api/task-status.types';
import type { TTasksByStatus } from '../../../model/tasks-by-status.types';

export interface ITaskBoardProps {
  readonly isMutating: boolean;
  readonly onCreateTask: (status: TTaskStatus) => void;
  readonly onChangeTaskStatus: (taskId: string, status: TTaskStatus) => Promise<TTask>;
  readonly tasksByStatus: TTasksByStatus;
  readonly onOpenTask: (task: TTask) => void;
}
