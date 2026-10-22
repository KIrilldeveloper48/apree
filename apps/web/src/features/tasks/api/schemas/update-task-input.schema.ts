import { createTaskInputSchema } from './create-task-input.schema';

export const updateTaskInputSchema = createTaskInputSchema
  .pick({ title: true, description: true, priority: true })
  .partial()
  .refine((input) => Object.keys(input).length > 0, {
    message: 'Provide at least one task field to update.',
  });
