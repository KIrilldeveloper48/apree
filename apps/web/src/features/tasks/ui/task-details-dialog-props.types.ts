import type { TTask } from '../api/task.types';

export interface ITaskDetailsDialogProps {
  readonly task: TTask;
  readonly isMutating: boolean;
  readonly onClose: () => void;
  readonly onEdit: () => void;
}
