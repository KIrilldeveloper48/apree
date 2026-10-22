import type { TCreateTaskInput } from '../../../api/create-task-input.types';
import type { TTask } from '../../../api/task.types';
import type { TTaskStatus } from '../../../api/task-status.types';

export interface ITaskDialogProps {
  readonly initialStatus: TTaskStatus;
  readonly task: TTask | null;
  readonly isSubmitting: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (input: TCreateTaskInput) => Promise<TTask>;
}
