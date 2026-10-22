import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { taskStatusSchema } from '../../api/schemas/task-status.schema';
import type { TTaskStatus } from '../../api/types/task-status.types';

import { getTaskPriorityPresentation } from '../task-card/helpers/get-task-priority-presentation.helpers';
import { getTaskCreatedAtLabel } from './helpers/get-task-created-at-label.helpers';
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
  const createdAtLabel = getTaskCreatedAtLabel(task.createdAt);

  async function handleChangeStatus(nextStatus: TTaskStatus): Promise<void> {
    try {
      await onChangeStatus(nextStatus);
    } catch {
      // Ошибка запроса отображается контейнером доски, где доступно повторное действие.
    }
  }

  function handleStatusSelectChange(event: SelectChangeEvent): void {
    const nextStatus = taskStatusSchema.safeParse(event.target.value);

    if (!nextStatus.success) {
      return;
    }

    void handleChangeStatus(nextStatus.data);
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={onClose} open>
      <DialogTitle component="div" sx={{ position: 'relative', pr: 7 }}>
        <IconButton
          aria-label="Закрыть просмотр задачи"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <Typography component="h1" variant="h4">
              {task.title}
            </Typography>
            <Chip
              color={priority.color}
              label={`${priority.label}`}
              size="small"
              sx={{ alignSelf: 'flex-start' }}
            />
          </Stack>
          <FormControl size="small" sx={{ minWidth: 168 }}>
            <InputLabel id="task-status-label">Статус</InputLabel>
            <Select
              disabled={isMutating}
              label="Статус"
              labelId="task-status-label"
              onChange={handleStatusSelectChange}
              value={task.status}
            >
              <MenuItem value="NEW">Новая</MenuItem>
              <MenuItem value="IN_PROGRESS">В работе</MenuItem>
              <MenuItem value="DONE">Готово</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Divider />
          <Stack spacing={1.5}>
            <Typography component="h2" variant="subtitle1">
              Описание
            </Typography>
            <Typography component="p" sx={{ whiteSpace: 'pre-wrap' }} variant="body1">
              {task.description}
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Создано {createdAtLabel}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
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
