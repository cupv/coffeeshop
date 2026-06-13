import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  const port = process.env.PORT ?? 3003;
  app
    .listen(process.env.PORT ?? 3003)
    .then(() => {
      console.log('The application is running on port ', port);
    })
    .catch((error) => {
      console.error('RunApplicationError', error);
    });
}

bootstrap();
