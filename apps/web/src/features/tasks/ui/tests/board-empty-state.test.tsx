import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { BoardEmptyState } from '../board-empty-state';

function handleCreateTask(): void {}

describe('BoardEmptyState', () => {
  it('объясняет пустое состояние и предлагает создать задачу', () => {
    const markup = renderToStaticMarkup(
      createElement(BoardEmptyState, {
        isCreating: false,
        onCreateTask: handleCreateTask,
      }),
    );

    expect(markup).toContain('На доске пока нет задач');
    expect(markup).toContain('Создать задачу');
  });
});
