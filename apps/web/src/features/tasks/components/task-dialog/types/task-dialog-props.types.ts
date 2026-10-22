import type { TCreateTaskInput } from '../../../api/types/create-task-input.types';
import type { TTask } from '../../../api/types/task.types';
import type { TTaskStatus } from '../../../api/types/task-status.types';

export interface ITaskDialogProps {
  readonly initialStatus: TTaskStatus;
  readonly task: TTask | null;
  readonly isSubmitting: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (input: TCreateTaskInput) => Promise<TTask>;
}
