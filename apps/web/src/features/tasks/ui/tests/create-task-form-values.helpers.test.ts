import { describe, expect, it } from 'vitest';

import type { TTask } from '../../api/task.types';

import { createTaskFormValues } from '../create-task-form-values.helpers';

const task = {
  id: '3dc3f7dd-6305-4054-bdc0-ea2127775a6c',
  title: 'Задача для редактирования',
  description: 'Описание задачи',
  priority: 'HIGH',
  status: 'NEW',
  createdAt: '2026-10-22T12:00:00.000Z',
  updatedAt: '2026-10-22T12:00:00.000Z',
} satisfies TTask;

describe('createTaskFormValues', () => {
  it('создаёт начальные значения новой задачи', () => {
    expect(createTaskFormValues(null)).toEqual({
      title: '',
      description: '',
      priority: 'MEDIUM',
    });
  });

  it('копирует редактируемые поля задачи', () => {
    expect(createTaskFormValues(task)).toEqual({
      title: 'Задача для редактирования',
      description: 'Описание задачи',
      priority: 'HIGH',
    });
  });
});
