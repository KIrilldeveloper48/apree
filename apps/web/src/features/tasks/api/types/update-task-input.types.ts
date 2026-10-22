import type { z } from 'zod';

import type { updateTaskInputSchema } from '../schemas/update-task-input.schema';

export type TUpdateTaskInput = z.input<typeof updateTaskInputSchema>;
