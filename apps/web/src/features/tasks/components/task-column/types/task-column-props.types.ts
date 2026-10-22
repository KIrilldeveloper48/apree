import type { TTask } from '../../../api/task.types';
import type { TTaskStatus } from '../../../api/task-status.types';

export interface ITaskColumnProps {
  readonly isMutating: boolean;
  readonly onCreateTask: (status: TTaskStatus) => void;
  readonly title: string;
  readonly status: TTaskStatus;
  readonly tasks: readonly TTask[];
  readonly onOpenTask: (task: TTask) => void;
}
