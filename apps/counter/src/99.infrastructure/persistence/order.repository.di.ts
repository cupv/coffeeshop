import { Provider } from '@nestjs/common';
import { ORDER_REPOSITORY_TOKEN } from 'src/01.domain';
import { OrderRepository } from './order.repository';

export const repositories: Provider[] = [
  {
    provide: ORDER_REPOSITORY_TOKEN,
    useClass: OrderRepository,
  },
];
