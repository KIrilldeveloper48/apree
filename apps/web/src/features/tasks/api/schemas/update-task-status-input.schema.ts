import { z } from 'zod';

import { taskStatusSchema } from './task-status.schema';

export const updateTaskStatusInputSchema = z.object({
  status: taskStatusSchema,
});
