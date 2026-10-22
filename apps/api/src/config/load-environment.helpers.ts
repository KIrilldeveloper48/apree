import { resolve } from 'node:path';

import { config } from 'dotenv';

export function loadEnvironment(): void {
  config({
    path: resolve(__dirname, '../../../../.env'),
    quiet: true,
  });
}
