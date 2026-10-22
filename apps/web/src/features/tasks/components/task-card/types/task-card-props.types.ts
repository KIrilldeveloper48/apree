import type { TTask } from '../../../api/types/task.types';

export interface ITaskCardProps {
  readonly isDragDisabled: boolean;
  readonly task: TTask;
  readonly onOpenTask: (task: TTask) => void;
}
