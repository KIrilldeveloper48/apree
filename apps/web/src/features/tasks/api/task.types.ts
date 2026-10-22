import type { z } from 'zod';

import type { taskSchema } from './task.schema';

export type TTask = z.infer<typeof taskSchema>;
