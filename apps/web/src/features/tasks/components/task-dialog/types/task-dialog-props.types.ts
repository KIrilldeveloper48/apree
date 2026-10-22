import type { TCreateTaskInput } from '../../../api/create-task-input.types';
import type { TTask } from '../../../api/task.types';

export interface ITaskDialogProps {
  readonly task: TTask | null;
  readonly isSubmitting: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (input: TCreateTaskInput) => Promise<TTask>;
}
