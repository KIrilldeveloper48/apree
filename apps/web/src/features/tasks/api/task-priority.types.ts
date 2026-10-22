import type { z } from 'zod';

import type { taskPrioritySchema } from './task-priority.schema';

export type TTaskPriority = z.infer<typeof taskPrioritySchema>;
