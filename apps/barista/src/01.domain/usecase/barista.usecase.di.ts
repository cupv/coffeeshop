import { Provider } from '@nestjs/common';
import { BaristaUseCase } from './barista.usecase';
import { BARISTA_USECASE_TOKEN } from './barista.usecase.port';

export const usecases: Provider[] = [
  {
    provide: BARISTA_USECASE_TOKEN,
    useClass: BaristaUseCase,
  },
];
