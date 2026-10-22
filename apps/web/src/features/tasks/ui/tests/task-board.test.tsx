import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import type { TTask } from '../../api/task.types';
import type { TTasksByStatus } from '../../model/tasks-by-status.types';

import { TaskBoard } from '../task-board';

const newTask = {
  id: '3dc3f7dd-6305-4054-bdc0-ea2127775a6c',
  title: 'Новая задача',
  description: 'Описание новой задачи',
  priority: 'LOW',
  status: 'NEW',
  createdAt: '2026-10-22T12:00:00.000Z',
  updatedAt: '2026-10-22T12:00:00.000Z',
} satisfies TTask;

const tasksByStatus = {
  NEW: [newTask],
  IN_PROGRESS: [],
  DONE: [],
} satisfies TTasksByStatus;

function handleOpenTask(): void {}

describe('TaskBoard', () => {
  it('отображает три колонки и карточку задачи в её статусе', () => {
    const markup = renderToStaticMarkup(
      createElement(TaskBoard, { onOpenTask: handleOpenTask, tasksByStatus }),
    );

    expect(markup).toContain('Новая');
    expect(markup).toContain('В работе');
    expect(markup).toContain('Готово');
    expect(markup).toContain('Новая задача');
    expect(markup).toContain('Низкий');
  });
});
