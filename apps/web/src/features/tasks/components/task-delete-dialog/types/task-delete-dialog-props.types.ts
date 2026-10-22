export interface ITaskDeleteDialogProps {
  readonly taskTitle: string;
  readonly isDeleting: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => Promise<void>;
}
