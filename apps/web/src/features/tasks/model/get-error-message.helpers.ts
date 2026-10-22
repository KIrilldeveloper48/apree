import { ApiError } from '../api/api-error';

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  return 'Не удалось выполнить запрос. Попробуйте ещё раз.';
}
