import { BadRequestException } from '@nestjs/common';

import type { Prisma } from '../../generated/prisma/client';

import { UpdateTaskDto } from '../schemas/update-task.dto';
import { normalizeTaskText } from './normalize-task-text.helpers';

export function createTaskUpdateData(input: UpdateTaskDto): Prisma.TaskUpdateInput {
  const data: Prisma.TaskUpdateInput = {};

  if (input.title !== undefined) {
    data.title = normalizeTaskText(input.title);
  }

  if (input.description !== undefined) {
    data.description = normalizeTaskText(input.description);
  }

  if (input.priority !== undefined) {
    data.priority = input.priority;
  }

  if (Object.keys(data).length === 0) {
    throw new BadRequestException('Provide at least one task field to update.');
  }

  return data;
}
