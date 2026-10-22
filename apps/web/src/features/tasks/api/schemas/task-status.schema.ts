import { z } from 'zod';

export const taskStatusSchema = z.enum(['NEW', 'IN_PROGRESS', 'DONE']);
