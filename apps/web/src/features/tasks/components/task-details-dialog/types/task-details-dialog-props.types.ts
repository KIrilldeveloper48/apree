import type { TTask } from '../../../api/types/task.types';
import type { TTaskStatus } from '../../../api/types/task-status.types';

export interface ITaskDetailsDialogProps {
  readonly task: TTask;
  readonly isMutating: boolean;
  readonly onClose: () => void;
  readonly onEdit: () => void;
  readonly onRequestDelete: () => void;
  readonly onChangeStatus: (status: TTaskStatus) => Promise<void>;
}
