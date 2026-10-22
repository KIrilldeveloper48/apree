import type { z } from 'zod';

import type { createTaskInputSchema } from '../schemas/create-task-input.schema';

export type TCreateTaskInput = z.input<typeof createTaskInputSchema>;
