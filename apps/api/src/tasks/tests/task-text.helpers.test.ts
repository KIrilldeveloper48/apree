import { describe, expect, it } from 'vitest';

import { normalizeTaskText } from '../task-text.helpers';

describe('normalizeTaskText', () => {
  it('trims surrounding whitespace', () => {
    expect(normalizeTaskText('  План релиза  ')).toBe('План релиза');
  });
});
