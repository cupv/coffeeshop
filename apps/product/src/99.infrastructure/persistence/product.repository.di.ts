import { Provider } from '@nestjs/common';
import { ProductLocalRepository } from './product-local.repository';
import { PRODUCT_REPOSITORY_DI_TOKEN_LOCAL } from '../../01.domain';

export const repositories: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY_DI_TOKEN_LOCAL,
    useClass: ProductLocalRepository,
  },
];
