import type { TTask } from '../../../api/task.types';

export interface ITaskCardProps {
  readonly isDragDisabled: boolean;
  readonly task: TTask;
  readonly onOpenTask: (task: TTask) => void;
}
