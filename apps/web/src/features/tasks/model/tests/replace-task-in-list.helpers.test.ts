import { describe, expect, it } from 'vitest';

import type { TTask } from '../../api/task.types';

import { replaceTaskInList } from '../replace-task-in-list.helpers';

const originalTask = {
  id: '3dc3f7dd-6305-4054-bdc0-ea2127775a6c',
  title: 'Исходная задача',
  description: 'Исходное описание',
  priority: 'LOW',
  status: 'NEW',
  createdAt: '2026-10-22T12:00:00.000Z',
  updatedAt: '2026-10-22T12:00:00.000Z',
} satisfies TTask;

const updatedTask = {
  ...originalTask,
  title: 'Обновлённая задача',
  status: 'DONE',
} satisfies TTask;

describe('replaceTaskInList', () => {
  it('заменяет только задачу с совпадающим идентификатором', () => {
    const untouchedTask = {
      ...originalTask,
      id: '7fa70322-8535-4ec2-b750-1d39ca0ca431',
      title: 'Другая задача',
    } satisfies TTask;

    expect(replaceTaskInList([originalTask, untouchedTask], updatedTask)).toEqual([
      updatedTask,
      untouchedTask,
    ]);
  });
});
