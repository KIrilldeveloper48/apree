import { describe, expect, it } from 'vitest';

import { getTaskStatusPresentation } from '../get-task-status-presentation.helpers';

describe('getTaskStatusPresentation', () => {
  it('возвращает понятные подписи для всех статусов задачи', () => {
    expect(getTaskStatusPresentation('NEW')).toMatchObject({ label: 'Новая' });
    expect(getTaskStatusPresentation('IN_PROGRESS')).toMatchObject({
      label: 'В работе',
    });
    expect(getTaskStatusPresentation('DONE')).toMatchObject({ label: 'Готово' });
  });
});
