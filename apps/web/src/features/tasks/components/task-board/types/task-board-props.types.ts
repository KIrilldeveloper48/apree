import type { TTask } from '../../../api/task.types';
import type { TTasksByStatus } from '../../../model/tasks-by-status.types';

export interface ITaskBoardProps {
  readonly tasksByStatus: TTasksByStatus;
  readonly onOpenTask: (task: TTask) => void;
}
