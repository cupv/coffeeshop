import { Provider } from '@nestjs/common';
import { ORDER_USECASE_TOKEN } from './order.usecase.port';
import { OrderUseCase } from './order.usecase';

export const services: Provider[] = [
  {
    provide: ORDER_USECASE_TOKEN,
    useClass: OrderUseCase,
  },
];
