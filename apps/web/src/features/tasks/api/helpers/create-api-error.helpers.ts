import { ApiError } from '../errors/api-error';
import { apiErrorResponseSchema } from '../schemas/api-error-response.schema';

export async function createApiError(response: Response): Promise<ApiError> {
  const payload = await response.json().catch(() => undefined);
  const parsedPayload = apiErrorResponseSchema.safeParse(payload);
  const details = parsedPayload.success
    ? typeof parsedPayload.data.message === 'string'
      ? [parsedPayload.data.message]
      : parsedPayload.data.message
    : ['The API request failed.'];

  return new ApiError(details.join(' '), response.status, details);
}
