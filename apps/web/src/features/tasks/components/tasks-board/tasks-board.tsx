'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';

import type { TCreateTaskInput } from '../../api/types/create-task-input.types';
import type { TTask } from '../../api/types/task.types';
import type { TTaskPriority } from '../../api/types/task-priority.types';
import type { TTaskStatus } from '../../api/types/task-status.types';
import { filterTasks } from '../../model/filter-tasks.helpers';
import { groupTasksByStatus } from '../../model/group-tasks-by-status.helpers';
import { useTasks } from '../../model/use-tasks';

import { TaskBoard } from '../task-board/task-board';
import { TaskDeleteDialog } from '../task-delete-dialog/task-delete-dialog';
import { TaskDetailsDialog } from '../task-details-dialog/task-details-dialog';
import { TaskDialog } from '../task-dialog/task-dialog';
import { BoardEmptyState } from '../../ui/board-empty-state/board-empty-state';
import { BoardErrorAlert } from '../../ui/board-error-alert/board-error-alert';
import { BoardLoadingState } from '../../ui/board-loading-state/board-loading-state';
import { TasksFilterBar } from '../../ui/tasks-filter-bar/tasks-filter-bar';

export function TasksBoard() {
  const {
    create,
    errorMessage,
    isLoading,
    isMutating,
    remove,
    reload,
    tasks,
    update,
    updateStatus,
  } = useTasks();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState<TTaskStatus>('NEW');
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<TTaskPriority | null>(null);
  const isBoardEmpty = tasks.length === 0;
  const filteredTasks = useMemo(
    () => filterTasks(tasks, searchQuery, priorityFilter),
    [priorityFilter, searchQuery, tasks],
  );
  const filteredTasksByStatus = useMemo(() => groupTasksByStatus(filteredTasks), [filteredTasks]);
  const isFiltering = searchQuery.trim().length > 0 || priorityFilter !== null;
  const isFilteredTasksEmpty = !isBoardEmpty && filteredTasks.length === 0;

  function handleOpenTask(task: TTask) {
    setSelectedTask(task);
  }

  function handleOpenCreateTask(status: TTaskStatus) {
    setCreateTaskStatus(status);
    setIsCreateDialogOpen(true);
  }

  function handleClearFilters() {
    setSearchQuery('');
    setPriorityFilter(null);
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

    const updatedTask = await handleMoveTaskStatus(selectedTask.id, status);

    setSelectedTask(updatedTask);
  }

  async function handleMoveTaskStatus(taskId: string, status: TTaskStatus): Promise<TTask> {
    return updateStatus(taskId, { status });
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
          {!isLoading && !isBoardEmpty ? (
            <TasksFilterBar
              isFiltering={isFiltering}
              onClear={handleClearFilters}
              onPriorityChange={setPriorityFilter}
              onSearchQueryChange={setSearchQuery}
              priority={priorityFilter}
              searchQuery={searchQuery}
            />
          ) : null}
          {isLoading ? (
            <BoardLoadingState />
          ) : isBoardEmpty ? (
            <BoardEmptyState
              isCreating={isMutating}
              onCreateTask={() => handleOpenCreateTask('NEW')}
            />
          ) : (
            <>
              {isFilteredTasksEmpty ? (
                <Alert severity="info">По заданным фильтрам задач не найдено.</Alert>
              ) : null}
              <TaskBoard
                isMutating={isMutating}
                onChangeTaskStatus={handleMoveTaskStatus}
                onCreateTask={handleOpenCreateTask}
                onOpenTask={handleOpenTask}
                tasksByStatus={filteredTasksByStatus}
              />
            </>
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
