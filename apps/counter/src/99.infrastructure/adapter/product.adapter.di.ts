import { Provider } from '@nestjs/common';
import { PRODUCT_SERVICE_TOKEN } from 'src/01.domain';
import { ProductAdapter } from './product.adapter';

export const adapters: Provider[] = [
  {
    provide: PRODUCT_SERVICE_TOKEN,
    useClass: ProductAdapter,
  },
];
