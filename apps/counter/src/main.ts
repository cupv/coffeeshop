import { NestFactory } from '@nestjs/core';
import { CounterModule } from './counter.module';

async function bootstrap() {
  const app = await NestFactory.create(CounterModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
