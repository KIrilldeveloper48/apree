import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';

import { TaskPriority } from '../../generated/prisma/enums';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { createTaskUpdateData } from '../task-update-data.helpers';

describe('createTaskUpdateData', () => {
  it('normalizes changed text fields without changing omitted fields', () => {
    const input = Object.assign(new UpdateTaskDto(), {
      title: '  Обновить документацию  ',
      priority: TaskPriority.HIGH,
    });

    expect(createTaskUpdateData(input)).toEqual({
      title: 'Обновить документацию',
      priority: TaskPriority.HIGH,
    });
  });

  it('rejects an update without fields', () => {
    expect(() => createTaskUpdateData(new UpdateTaskDto())).toThrow(BadRequestException);
  });
});
