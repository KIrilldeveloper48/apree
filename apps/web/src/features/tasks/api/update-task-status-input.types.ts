import type { z } from 'zod';

import type { updateTaskStatusInputSchema } from './update-task-status-input.schema';

export type TUpdateTaskStatusInput = z.input<typeof updateTaskStatusInputSchema>;
