import { createTaskInputSchema } from './create-task-input.schema';
import type { TCreateTaskInput } from './create-task-input.types';
import { requestApi } from './request-api.helpers';
import { taskIdSchema } from './task-id.schema';
import { taskSchema, tasksSchema } from './task.schema';
import type { TTask } from './task.types';
import { updateTaskInputSchema } from './update-task-input.schema';
import type { TUpdateTaskInput } from './update-task-input.types';
import { updateTaskStatusInputSchema } from './update-task-status-input.schema';
import type { TUpdateTaskStatusInput } from './update-task-status-input.types';

export async function listTasks(): Promise<readonly TTask[]> {
  return tasksSchema.parse(await requestApi('tasks'));
}

export async function getTask(taskId: string): Promise<TTask> {
  return taskSchema.parse(await requestApi(`tasks/${taskIdSchema.parse(taskId)}`));
}

export async function createTask(input: TCreateTaskInput): Promise<TTask> {
  const body = createTaskInputSchema.parse(input);

  return taskSchema.parse(
    await requestApi('tasks', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  );
}

export async function updateTask(taskId: string, input: TUpdateTaskInput): Promise<TTask> {
  const body = updateTaskInputSchema.parse(input);

  return taskSchema.parse(
    await requestApi(`tasks/${taskIdSchema.parse(taskId)}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  );
}

export async function updateTaskStatus(
  taskId: string,
  input: TUpdateTaskStatusInput,
): Promise<TTask> {
  const body = updateTaskStatusInputSchema.parse(input);

  return taskSchema.parse(
    await requestApi(`tasks/${taskIdSchema.parse(taskId)}/status`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  );
}

export async function deleteTask(taskId: string): Promise<void> {
  await requestApi(`tasks/${taskIdSchema.parse(taskId)}`, {
    method: 'DELETE',
  });
}
