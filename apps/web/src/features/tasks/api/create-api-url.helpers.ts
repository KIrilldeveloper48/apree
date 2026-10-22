import { getApiBaseUrl } from './get-api-base-url.helpers';

export function createApiUrl(path: string): string {
  return new URL(path, `${getApiBaseUrl()}/`).toString();
}
