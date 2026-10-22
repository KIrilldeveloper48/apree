import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getTaskPriorityPresentation } from './get-task-priority-presentation.helpers';
import type { ITaskDetailsDialogProps } from './task-details-dialog-props.types';

export function TaskDetailsDialog({ task, isMutating, onClose, onEdit }: ITaskDetailsDialogProps) {
  const priority = getTaskPriorityPresentation(task.priority);

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open>
      <DialogTitle>{task.title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Chip
            color={priority.color}
            label={`Приоритет: ${priority.label}`}
            size="small"
            sx={{ alignSelf: 'flex-start' }}
          />
          <Typography variant="body1">{task.description}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} type="button">
          Закрыть
        </Button>
        <Button disabled={isMutating} onClick={onEdit} type="button" variant="contained">
          Редактировать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
