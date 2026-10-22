import type { z } from 'zod';

import type { TTaskFormValidationMessages } from '../types/task-form-validation-messages.types';

function getFieldValidationMessage(
  issues: readonly z.core.$ZodIssue[],
  fieldName: string,
): string | null {
  return issues.find((issue) => issue.path[0] === fieldName)?.message ?? null;
}

export function getTaskFormValidationMessages(
  issues: readonly z.core.$ZodIssue[],
): TTaskFormValidationMessages {
  return {
    title: getFieldValidationMessage(issues, 'title'),
    description: getFieldValidationMessage(issues, 'description'),
  };
}
