import type { z } from 'zod';

import type { taskSchema } from '../schemas/task.schema';

export type TTask = z.infer<typeof taskSchema>;
