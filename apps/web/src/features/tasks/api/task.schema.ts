import { z } from 'zod';

import { taskPrioritySchema } from './task-priority.schema';
import { taskStatusSchema } from './task-status.schema';

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  priority: taskPrioritySchema,
  status: taskStatusSchema,
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const tasksSchema = z.array(taskSchema);
