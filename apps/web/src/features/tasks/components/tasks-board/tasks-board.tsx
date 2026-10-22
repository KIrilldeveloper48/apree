'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import type { TCreateTaskInput } from '../../api/create-task-input.types';
import type { TTask } from '../../api/task.types';
import type { TTaskStatus } from '../../api/task-status.types';
import { useTasks } from '../../model/use-tasks';

import { TaskBoard } from '../task-board/task-board';
import { TaskDeleteDialog } from '../task-delete-dialog/task-delete-dialog';
import { TaskDetailsDialog } from '../task-details-dialog/task-details-dialog';
import { TaskDialog } from '../task-dialog/task-dialog';
import { BoardEmptyState } from '../../ui/board-empty-state/board-empty-state';
import { BoardErrorAlert } from '../../ui/board-error-alert/board-error-alert';
import { BoardLoadingState } from '../../ui/board-loading-state/board-loading-state';

export function TasksBoard() {
  const {
    create,
    errorMessage,
    isLoading,
    isMutating,
    remove,
    reload,
    tasks,
    tasksByStatus,
    update,
    updateStatus,
  } = useTasks();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState<TTaskStatus>('NEW');
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isBoardEmpty = tasks.length === 0;

  function handleOpenTask(task: TTask) {
    setSelectedTask(task);
  }

  function handleOpenCreateTask(status: TTaskStatus) {
    setCreateTaskStatus(status);
    setIsCreateDialogOpen(true);
  }

  function handleCloseTask() {
    setSelectedTask(null);
    setIsEditingTask(false);
    setIsDeleteDialogOpen(false);
  }

  function handleEditTask() {
    setIsEditingTask(true);
  }

  function handleRequestDelete() {
    setIsDeleteDialogOpen(true);
  }

  function handleCloseDeleteDialog() {
    setIsDeleteDialogOpen(false);
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

  async function handleChangeTaskStatus(status: TTaskStatus): Promise<void> {
    if (selectedTask === null) {
      throw new Error('Невозможно изменить статус невыбранной задачи.');
    }

    const updatedTask = await updateStatus(selectedTask.id, { status });

    setSelectedTask(updatedTask);
  }

  async function handleDeleteTask(): Promise<void> {
    if (selectedTask === null) {
      throw new Error('Невозможно удалить невыбранную задачу.');
    }

    await remove(selectedTask.id);
    handleCloseTask();
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
              onClick={() => handleOpenCreateTask('NEW')}
              variant="contained"
            >
              Новая задача
            </Button>
          </Stack>
          {errorMessage !== null ? (
            <BoardErrorAlert isRetrying={isLoading} message={errorMessage} onRetry={reload} />
          ) : null}
          {isLoading ? (
            <BoardLoadingState />
          ) : isBoardEmpty ? (
            <BoardEmptyState
              isCreating={isMutating}
              onCreateTask={() => handleOpenCreateTask('NEW')}
            />
          ) : (
            <TaskBoard
              isCreating={isMutating}
              onCreateTask={handleOpenCreateTask}
              onOpenTask={handleOpenTask}
              tasksByStatus={tasksByStatus}
            />
          )}
        </Stack>
      </Container>
      {isCreateDialogOpen ? (
        <TaskDialog
          initialStatus={createTaskStatus}
          isSubmitting={isMutating}
          onClose={() => setIsCreateDialogOpen(false)}
          onSubmit={handleCreateTask}
          task={null}
        />
      ) : null}
      {selectedTask !== null && !isEditingTask ? (
        <TaskDetailsDialog
          isMutating={isMutating}
          onChangeStatus={handleChangeTaskStatus}
          onClose={handleCloseTask}
          onEdit={handleEditTask}
          onRequestDelete={handleRequestDelete}
          task={selectedTask}
        />
      ) : null}
      {selectedTask !== null && isDeleteDialogOpen ? (
        <TaskDeleteDialog
          isDeleting={isMutating}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteTask}
          taskTitle={selectedTask.title}
        />
      ) : null}
      {selectedTask !== null && isEditingTask ? (
        <TaskDialog
          initialStatus={selectedTask.status}
          isSubmitting={isMutating}
          onClose={handleCloseTask}
          onSubmit={handleUpdateTask}
          task={selectedTask}
        />
      ) : null}
    </main>
  );
}
