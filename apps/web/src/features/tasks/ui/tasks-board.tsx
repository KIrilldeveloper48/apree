'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import type { TCreateTaskInput } from '../api/create-task-input.types';
import type { TTask } from '../api/task.types';
import { useTasks } from '../model/use-tasks';

import { TaskBoard } from './task-board';
import { TaskDetailsDialog } from './task-details-dialog';
import { TaskDialog } from './task-dialog';

export function TasksBoard() {
  const { create, errorMessage, isLoading, isMutating, tasksByStatus, update } = useTasks();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const [isEditingTask, setIsEditingTask] = useState(false);

  function handleOpenTask(task: TTask) {
    setSelectedTask(task);
  }

  function handleCloseTask() {
    setSelectedTask(null);
    setIsEditingTask(false);
  }

  function handleEditTask() {
    setIsEditingTask(true);
  }

  async function handleCreateTask(input: TCreateTaskInput): Promise<TTask> {
    return create(input);
  }

  async function handleUpdateTask(input: TCreateTaskInput): Promise<TTask> {
    if (selectedTask === null) {
      throw new Error('Невозможно обновить невыбранную задачу.');
    }

    const updatedTask = await update(selectedTask.id, input);

    setSelectedTask(updatedTask);

    return updatedTask;
  }

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
          >
            <Stack spacing={0.5}>
              <Typography component="h1" variant="h4">
                Задачник
              </Typography>
              <Typography color="text.secondary" variant="body1">
                Планируйте задачи и отслеживайте их выполнение.
              </Typography>
            </Stack>
            <Button
              disabled={isMutating}
              onClick={() => setIsCreateDialogOpen(true)}
              variant="contained"
            >
              Новая задача
            </Button>
          </Stack>
          {errorMessage !== null ? <Alert severity="error">{errorMessage}</Alert> : null}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress aria-label="Загрузка задач" />
            </Box>
          ) : (
            <TaskBoard onOpenTask={handleOpenTask} tasksByStatus={tasksByStatus} />
          )}
        </Stack>
      </Container>
      {isCreateDialogOpen ? (
        <TaskDialog
          isSubmitting={isMutating}
          onClose={() => setIsCreateDialogOpen(false)}
          onSubmit={handleCreateTask}
          task={null}
        />
      ) : null}
      {selectedTask !== null && !isEditingTask ? (
        <TaskDetailsDialog
          isMutating={isMutating}
          onClose={handleCloseTask}
          onEdit={handleEditTask}
          task={selectedTask}
        />
      ) : null}
      {selectedTask !== null && isEditingTask ? (
        <TaskDialog
          isSubmitting={isMutating}
          onClose={handleCloseTask}
          onSubmit={handleUpdateTask}
          task={selectedTask}
        />
      ) : null}
    </main>
  );
}
