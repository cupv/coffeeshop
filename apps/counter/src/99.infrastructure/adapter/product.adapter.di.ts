import { Provider } from '@nestjs/common';
import { PRODUCT_USECASE_TOKEN } from 'src/01.domain';
import { ProductAdapter } from './product.adapter';

export const adapters: Provider[] = [
  {
    provide: PRODUCT_USECASE_TOKEN,
    useClass: ProductAdapter,
  },
];
