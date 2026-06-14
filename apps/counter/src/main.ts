import { NestFactory } from '@nestjs/core';
import { CounterModule } from './counter.module';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const isService = process.env.APP_TYPE === 'SERVICE'
  const module = isService ? CounterModule : WorkerModule
  const app = await NestFactory.create(module);
  app.setGlobalPrefix('/api/v1');
  app.enableVersioning();
  const port = process.env.PORT ?? 3002;
  app
    .listen(port)
    .then(() => {
      console.log('The application is running on port ', port);
    })
    .catch((error) => {
      console.error('RunApplicationError', error);
    });
}

bootstrap();
