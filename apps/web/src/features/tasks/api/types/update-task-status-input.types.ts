import type { z } from 'zod';

import type { updateTaskStatusInputSchema } from '../schemas/update-task-status-input.schema';

export type TUpdateTaskStatusInput = z.input<typeof updateTaskStatusInputSchema>;
