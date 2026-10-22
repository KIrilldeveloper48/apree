import { createApiError } from './create-api-error.helpers';
import { createApiUrl } from './create-api-url.helpers';

export async function requestApi(path: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(createApiUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw await createApiError(response);
  }

  if (response.status === 204) {
    return undefined;
  }

  return response.json();
}
