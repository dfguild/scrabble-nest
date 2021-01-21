import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'verbose', 'warn'],
  });
  app.enableCors();
  console.log(`listening on port ${process.env.PORT || 3000}`);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
