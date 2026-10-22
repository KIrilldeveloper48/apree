import type { z } from 'zod';

import type { taskStatusSchema } from '../schemas/task-status.schema';

export type TTaskStatus = z.infer<typeof taskStatusSchema>;
