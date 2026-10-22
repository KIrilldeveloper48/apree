import { afterEach, describe, expect, it, vi } from 'vitest';

import { listTasks } from '../tasks-api';

const task = {
  id: 'fb21a1a7-7a96-4b61-a5cc-a2f174f4c5de',
  title: 'Подготовить релиз',
  description: 'Проверить API и миграции.',
  priority: 'HIGH',
  status: 'NEW',
  createdAt: '2026-10-22T12:00:00.000Z',
  updatedAt: '2026-10-22T12:00:00.000Z',
};

describe('listTasks', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns a runtime-validated task list', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([task]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(listTasks()).resolves.toEqual([task]);
  });

  it('rejects a malformed successful response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([{ ...task, status: 'ARCHIVED' }]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(listTasks()).rejects.toThrow();
  });

  it('maps an API error response to ApiError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: ['Title must not be empty.'] }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(listTasks()).rejects.toMatchObject({
      status: 400,
      details: ['Title must not be empty.'],
    });
  });
});
