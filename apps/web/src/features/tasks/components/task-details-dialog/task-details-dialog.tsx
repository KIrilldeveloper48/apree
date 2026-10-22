import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { TTaskStatus } from '../../api/task-status.types';

import { getTaskPriorityPresentation } from '../task-card/helpers/get-task-priority-presentation.helpers';
import { getTaskStatusPresentation } from './helpers/get-task-status-presentation.helpers';
import type { ITaskDetailsDialogProps } from './types/task-details-dialog-props.types';

export function TaskDetailsDialog({
  task,
  isMutating,
  onClose,
  onEdit,
  onRequestDelete,
  onChangeStatus,
}: ITaskDetailsDialogProps) {
  const priority = getTaskPriorityPresentation(task.priority);
  const status = getTaskStatusPresentation(task.status);

  async function handleChangeStatus(nextStatus: TTaskStatus): Promise<void> {
    try {
      await onChangeStatus(nextStatus);
    } catch {
      // Ошибка запроса отображается контейнером доски, где доступно повторное действие.
    }
  }

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
          <Chip
            color={status.color}
            label={`Статус: ${status.label}`}
            size="small"
            sx={{ alignSelf: 'flex-start' }}
          />
          <Typography variant="body1">{task.description}</Typography>
          <Stack spacing={1}>
            <Typography component="h2" variant="subtitle2">
              Переместить задачу
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              {task.status !== 'NEW' ? (
                <Button
                  disabled={isMutating}
                  onClick={() => void handleChangeStatus('NEW')}
                  size="small"
                  type="button"
                >
                  В «Новая»
                </Button>
              ) : null}
              {task.status !== 'IN_PROGRESS' ? (
                <Button
                  disabled={isMutating}
                  onClick={() => void handleChangeStatus('IN_PROGRESS')}
                  size="small"
                  type="button"
                >
                  В «В работе»
                </Button>
              ) : null}
              {task.status !== 'DONE' ? (
                <Button
                  disabled={isMutating}
                  onClick={() => void handleChangeStatus('DONE')}
                  size="small"
                  type="button"
                >
                  В «Готово»
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} type="button">
          Закрыть
        </Button>
        <Button disabled={isMutating} onClick={onEdit} type="button" variant="contained">
          Редактировать
        </Button>
        <Button color="error" disabled={isMutating} onClick={onRequestDelete} type="button">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
