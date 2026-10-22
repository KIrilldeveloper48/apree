import { describe, expect, it } from 'vitest';

import { normalizeTaskText } from '../helpers/normalize-task-text.helpers';

describe('normalizeTaskText', () => {
  it('trims surrounding whitespace', () => {
    expect(normalizeTaskText('  План релиза  ')).toBe('План релиза');
  });
});
