import { Provider } from '@nestjs/common';
import { ProductLocalRepository } from './product-local.repository';
import { PRODUCT_LOCAL_REPOSITORY_TOKEN } from '../../01.domain';

export const repositories: Provider[] = [
  {
    provide: PRODUCT_LOCAL_REPOSITORY_TOKEN,
    useClass: ProductLocalRepository,
  },
];
