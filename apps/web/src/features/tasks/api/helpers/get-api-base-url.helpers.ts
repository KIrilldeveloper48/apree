import { z } from 'zod';

const apiBaseUrlSchema = z.string().url();

export function getApiBaseUrl(): string {
  return apiBaseUrlSchema.parse(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api',
  );
}
