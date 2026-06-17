import { NestFactory } from '@nestjs/core';
import { BaristaModule } from './barista.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const mqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
  const queue = process.env.QUEUE || 'order_outbox_queue'
  const app = await NestFactory.create(BaristaModule);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [mqUrl],
      queue: queue,
      queueOptions: {
        durable: true,
      },
      persistent: true,
      noAck: false,
    },
  });

  const port = process.env.PORT ?? 3000;

  await app.startAllMicroservices()

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
