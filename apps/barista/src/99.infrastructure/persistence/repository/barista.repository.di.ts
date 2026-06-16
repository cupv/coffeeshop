import { Provider } from '@nestjs/common';
import { BaristaRepository } from './barista.repository';
import { BARISTA_REPOSITORY_TOKEN } from 'src/01.domain';

export const repositories: Provider[] = [
  {
    provide: BARISTA_REPOSITORY_TOKEN,
    useClass: BaristaRepository,
  },
];
