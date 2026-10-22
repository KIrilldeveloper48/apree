import type { TTask } from '../../../api/task.types';

export interface ITaskColumnProps {
  readonly title: string;
  readonly tasks: readonly TTask[];
  readonly onOpenTask: (task: TTask) => void;
}
