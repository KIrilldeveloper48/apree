import { describe, expect, it } from 'vitest';

import type { TTask } from '../../api/task.types';

import { groupTasksByStatus } from '../group-tasks-by-status.helpers';

const newTask = {
  id: '3dc3f7dd-6305-4054-bdc0-ea2127775a6c',
  title: 'Новая задача',
  description: 'Описание новой задачи',
  priority: 'LOW',
  status: 'NEW',
  createdAt: '2026-10-22T12:00:00.000Z',
  updatedAt: '2026-10-22T12:00:00.000Z',
} satisfies TTask;

const inProgressTask = {
  id: '7fa70322-8535-4ec2-b750-1d39ca0ca431',
  title: 'Задача в работе',
  description: 'Описание задачи в работе',
  priority: 'MEDIUM',
  status: 'IN_PROGRESS',
  createdAt: '2026-10-22T12:00:00.000Z',
  updatedAt: '2026-10-22T12:00:00.000Z',
} satisfies TTask;

const doneTask = {
  id: 'c08800b1-50b6-4f9b-b336-61d54bce1c1d',
  title: 'Готовая задача',
  description: 'Описание готовой задачи',
  priority: 'HIGH',
  status: 'DONE',
  createdAt: '2026-10-22T12:00:00.000Z',
  updatedAt: '2026-10-22T12:00:00.000Z',
} satisfies TTask;

describe('groupTasksByStatus', () => {
  it('разделяет задачи по трём статусам', () => {
    expect(groupTasksByStatus([doneTask, newTask, inProgressTask])).toEqual({
      NEW: [newTask],
      IN_PROGRESS: [inProgressTask],
      DONE: [doneTask],
    });
  });

  it('возвращает все три пустые группы для пустого списка', () => {
    expect(groupTasksByStatus([])).toEqual({
      NEW: [],
      IN_PROGRESS: [],
      DONE: [],
    });
  });
});
