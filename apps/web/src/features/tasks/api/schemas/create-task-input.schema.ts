import { z } from 'zod';

import { taskPrioritySchema } from './task-priority.schema';
import { taskStatusSchema } from './task-status.schema';

export const createTaskInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Укажите название задачи.')
    .max(200, 'Название не должно быть длиннее 200 символов.'),
  description: z
    .string()
    .trim()
    .min(1, 'Добавьте описание задачи.')
    .max(5000, 'Описание не должно быть длиннее 5000 символов.'),
  priority: taskPrioritySchema,
  status: taskStatusSchema,
});
