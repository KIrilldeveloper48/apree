import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';

import { TaskPriority } from '../../generated/prisma/enums';
import { CreateTaskDto } from '../schemas/create-task.dto';

describe('CreateTaskDto', () => {
  it('rejects whitespace-only title and missing priority', async () => {
    const input = Object.assign(new CreateTaskDto(), {
      title: '   ',
      description: 'Описание задачи',
    });

    const errors = await validate(input);

    expect(errors.map((error) => error.property)).toEqual(
      expect.arrayContaining(['title', 'priority']),
    );
  });

  it('accepts a complete task input', async () => {
    const input = Object.assign(new CreateTaskDto(), {
      title: 'Подготовить релиз',
      description: 'Проверить миграции и API.',
      priority: TaskPriority.MEDIUM,
    });

    expect(await validate(input)).toHaveLength(0);
  });
});
