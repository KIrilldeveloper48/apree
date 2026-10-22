import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import type { ITaskDeleteDialogProps } from './types/task-delete-dialog-props.types';

export function TaskDeleteDialog({
  taskTitle,
  isDeleting,
  onClose,
  onConfirm,
}: ITaskDeleteDialogProps) {
  async function handleConfirm(): Promise<void> {
    try {
      await onConfirm();
    } catch {
      // Ошибка запроса отображается контейнером доски, где доступно повторное действие.
    }
  }

  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open>
      <DialogTitle>Удалить задачу?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Задача «{taskTitle}» будет удалена без возможности восстановления.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isDeleting} onClick={onClose} type="button">
          Отмена
        </Button>
        <Button
          color="error"
          disabled={isDeleting}
          onClick={() => void handleConfirm()}
          type="button"
          variant="contained"
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
