import { Provider } from '@nestjs/common';
import { ORDER_SERVICE_DI_TOKEN } from './order.service.port';
import { OrderService } from './order.service';

export const services: Provider[] = [
  {
    provide: ORDER_SERVICE_DI_TOKEN,
    useClass: OrderService,
  },
];
