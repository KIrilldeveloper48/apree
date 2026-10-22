import { z } from 'zod';

export const apiErrorResponseSchema = z.object({
  message: z.union([z.string(), z.array(z.string())]),
});
