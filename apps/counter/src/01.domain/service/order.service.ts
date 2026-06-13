import { Inject } from '@nestjs/common';
import { CreateOrderCommand } from '../command';
import { Order } from '../entity';
import {
  ORDER_REPOSITORY_TOKEN,
  type OrderRepositoryPort,
} from '../repository';
import { OrderServicePort } from './order.service.port';
import { type BaristaEventHandlerPort } from './barista/barista-event-handler.port';

export class OrderService implements OrderServicePort {
  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepository: OrderRepositoryPort,
    private readonly baristaEventHandler: BaristaEventHandlerPort,
  ) {}

  async create(command: CreateOrderCommand): Promise<boolean> {
    await this.orderRepository.create(command);
    await this.baristaEventHandler.publish();
    return true;
  }

  getAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
