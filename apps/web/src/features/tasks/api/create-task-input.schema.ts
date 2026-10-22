import { z } from 'zod';

import { taskPrioritySchema } from './task-priority.schema';

export const createTaskInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(5000),
  priority: taskPrioritySchema,
});
