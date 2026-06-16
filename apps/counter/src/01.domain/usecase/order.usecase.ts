import { Inject } from '@nestjs/common';
import {
  ORDER_REPOSITORY_TOKEN,
  type OrderRepositoryPort,
} from '../repository';
import { CreateOrderOptions, OrderUseCasePort } from './order.usecase.port';
import { CreateOrderCommand, CreateOrderLineItemCommand } from '../command';
import { uuidv7 } from 'uuidv7';
import { Order, OrderStatus } from '../entity';

export class OrderUseCase implements OrderUseCasePort {
  constructor(
    @Inject(ORDER_REPOSITORY_TOKEN)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async create(options: CreateOrderOptions): Promise<string> {
    const { lines, memberId, source } = options;

    const orderId = uuidv7();

    const orderLineCommands = lines.map<CreateOrderLineItemCommand>((line) => {
      const { name, price, type } = line;
      const orderLineId = uuidv7();
      return {
        id: orderLineId,
        name,
        orderId,
        price,
        status: OrderStatus.PAID,
        type,
      };
    });

    const command: CreateOrderCommand = {
      id: orderId,
      source,
      status: OrderStatus.PAID,
      memberId,
      lines: orderLineCommands,
      outbox: {
        id: uuidv7(),
        eventType: 'OrderPaid',
        orderId,
        status: 'PENDING',
        retryCount: 0,
        type: 'Barista',
        payload: {
          orderId,
          source,
          memberId,
          status: OrderStatus.PAID,
          lines: orderLineCommands,
        },
      },
    };

    const id = await this.orderRepository.create(command);

    return id;
  }

  getAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
