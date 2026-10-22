import type { TTask } from '../api/task.types';

export interface ITaskCardProps {
  readonly task: TTask;
  readonly onOpenTask: (task: TTask) => void;
}
