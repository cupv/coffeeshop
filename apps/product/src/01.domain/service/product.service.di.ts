import { Provider } from '@nestjs/common';
import { ProductService } from './product.service';

export const PRODUCT_SERVICE_TOKEN = Symbol('PRODUCT_SERVICE_TOKEN');

export const services: Provider[] = [
  {
    provide: PRODUCT_SERVICE_TOKEN,
    useClass: ProductService,
  },
];
