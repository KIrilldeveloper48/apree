import { requestApi } from '../helpers/request-api.helpers';
import { createTaskInputSchema } from '../schemas/create-task-input.schema';
import { taskIdSchema } from '../schemas/task-id.schema';
import { taskSchema, tasksSchema } from '../schemas/task.schema';
import { updateTaskInputSchema } from '../schemas/update-task-input.schema';
import { updateTaskStatusInputSchema } from '../schemas/update-task-status-input.schema';
import type { TCreateTaskInput } from '../types/create-task-input.types';
import type { TTask } from '../types/task.types';
import type { TUpdateTaskInput } from '../types/update-task-input.types';
import type { TUpdateTaskStatusInput } from '../types/update-task-status-input.types';

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
