'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

import { createTaskInputSchema } from '../../api/create-task-input.schema';
import type { TCreateTaskInput } from '../../api/create-task-input.types';
import { taskPrioritySchema } from '../../api/task-priority.schema';
import { taskStatusSchema } from '../../api/task-status.schema';

import { createTaskFormValues } from './helpers/create-task-form-values.helpers';
import type { ITaskDialogProps } from './types/task-dialog-props.types';

const taskFormId = 'task-form';

export function TaskDialog({
  initialStatus,
  task,
  isSubmitting,
  onClose,
  onSubmit,
}: ITaskDialogProps) {
  const [values, setValues] = useState<TCreateTaskInput>(() =>
    createTaskFormValues(task, initialStatus),
  );
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const isEditing = task !== null;

  function handleTitleChange(title: string) {
    setValues((currentValues) => ({ ...currentValues, title }));
  }

  function handleDescriptionChange(description: string) {
    setValues((currentValues) => ({ ...currentValues, description }));
  }

  function handlePriorityChange(event: SelectChangeEvent) {
    const parsedPriority = taskPrioritySchema.safeParse(event.target.value);

    if (parsedPriority.success) {
      setValues((currentValues) => ({
        ...currentValues,
        priority: parsedPriority.data,
      }));
    }
  }

  function handleStatusChange(event: SelectChangeEvent) {
    const parsedStatus = taskStatusSchema.safeParse(event.target.value);

    if (parsedStatus.success) {
      setValues((currentValues) => ({ ...currentValues, status: parsedStatus.data }));
    }
  }

  async function handleSubmit(): Promise<void> {
    const parsedValues = createTaskInputSchema.safeParse(values);

    if (!parsedValues.success) {
      setValidationMessage(parsedValues.error.issues[0]?.message ?? 'Проверьте заполненные поля.');
      return;
    }

    setValidationMessage(null);

    try {
      await onSubmit(parsedValues.data);
      onClose();
    } catch {
      // Ошибка запроса отображается контейнером доски, где доступно повторное действие.
    }
  }

  return (
    <Dialog
      aria-describedby="task-dialog-description"
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open
    >
      <DialogTitle>{isEditing ? 'Редактировать задачу' : 'Новая задача'}</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id={taskFormId}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
          spacing={2}
          sx={{ pt: 1 }}
        >
          <p id="task-dialog-description">
            {isEditing
              ? 'Измените данные задачи и сохраните изменения.'
              : 'Заполните данные, чтобы добавить задачу на доску.'}
          </p>
          {validationMessage !== null ? <Alert severity="error">{validationMessage}</Alert> : null}
          <TextField
            autoFocus
            disabled={isSubmitting}
            label="Название"
            onChange={(event) => handleTitleChange(event.target.value)}
            required
            slotProps={{ htmlInput: { maxLength: 200 } }}
            value={values.title}
          />
          <TextField
            disabled={isSubmitting}
            label="Описание"
            minRows={4}
            multiline
            onChange={(event) => handleDescriptionChange(event.target.value)}
            required
            slotProps={{ htmlInput: { maxLength: 5000 } }}
            value={values.description}
          />
          <FormControl fullWidth required>
            <InputLabel id="task-priority-label">Приоритет</InputLabel>
            <Select
              disabled={isSubmitting}
              label="Приоритет"
              labelId="task-priority-label"
              onChange={handlePriorityChange}
              value={values.priority}
            >
              <MenuItem value="LOW">Низкий</MenuItem>
              <MenuItem value="MEDIUM">Средний</MenuItem>
              <MenuItem value="HIGH">Высокий</MenuItem>
            </Select>
          </FormControl>
          {!isEditing ? (
            <FormControl fullWidth required>
              <InputLabel id="task-status-label">Колонка</InputLabel>
              <Select
                disabled={isSubmitting}
                label="Колонка"
                labelId="task-status-label"
                onChange={handleStatusChange}
                value={values.status}
              >
                <MenuItem value="NEW">Новая</MenuItem>
                <MenuItem value="IN_PROGRESS">В работе</MenuItem>
                <MenuItem value="DONE">Готово</MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} onClick={onClose} type="button">
          Отмена
        </Button>
        <Button disabled={isSubmitting} form={taskFormId} type="submit" variant="contained">
          {isEditing ? 'Сохранить' : 'Создать'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
