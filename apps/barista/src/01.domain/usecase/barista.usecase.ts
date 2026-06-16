import { Inject } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';
import {
  BARISTA_REPOSITORY_TOKEN,
  CreateOrderCommand,
  type BaristaRepositoryPort,
} from '../repository';
import { BaristaUseCasePort, CreateOrderOptions } from './barista.usecase.port';

export class BaristaUseCase implements BaristaUseCasePort {
  constructor(
    @Inject(BARISTA_REPOSITORY_TOKEN)
    private readonly baristaRepository: BaristaRepositoryPort,
  ) {}

  async createOrder(options: CreateOrderOptions): Promise<boolean> {
    const { name, orderId, type } = options;
    
    const command: CreateOrderCommand = {
      id: uuidv7(),
      orderId,
      name,
      type,
      completedAt: new Date(),
    };

    const isOk = await this.baristaRepository.createOrder(command);

    return isOk;
  }
}
