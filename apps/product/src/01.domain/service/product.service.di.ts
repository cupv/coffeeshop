import { Provider } from '@nestjs/common';
import { PRODUCT_SERVICE_DI_TOKEN } from './product.service.port';
import { ProductService } from './product.service';

export const services: Provider[] = [
  {
    provide: PRODUCT_SERVICE_DI_TOKEN,
    useClass: ProductService,
  },
];
