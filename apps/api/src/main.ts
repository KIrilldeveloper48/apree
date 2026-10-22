import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configureApiApplication } from './config/configure-api-application.helpers';
import { loadEnvironment } from './config/load-environment.helpers';

async function bootstrap(): Promise<void> {
  loadEnvironment();

  const app = await NestFactory.create(AppModule);
  configureApiApplication(app);
  await app.listen(process.env.PORT ?? process.env.API_PORT ?? 3001);
}

void bootstrap();
