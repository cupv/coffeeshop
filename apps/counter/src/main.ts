import { NestFactory } from '@nestjs/core';
import { CounterModule } from './counter.module';

async function bootstrap() {
  const app = await NestFactory.create(CounterModule);
  app.setGlobalPrefix('/api');
  app.enableVersioning();
  const port = process.env.PORT ?? 3002;
  await app.listen(port);
}
bootstrap();
