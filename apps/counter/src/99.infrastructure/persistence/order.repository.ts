import { Nullable } from 'src/00.common';
import {
  CreateOrderCommand,
  CreateOrderLineItemCommand,
  Order,
  OrderRepositoryPort,
  UpdateOrderCommand,
} from '../../01.domain';
import { OrderEntity } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderLineItemEntity } from './order-line-item.entity';

export class OrderRepository implements OrderRepositoryPort {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderLineItemEntity)
    private readonly orderLineItemRepository: Repository<OrderLineItemEntity>,
  ) {}

  async create(command: CreateOrderCommand): Promise<boolean> {
    const { id, source, status, memberId, lines } = command;

    const orderEntity = new OrderEntity();
    orderEntity.id = id;
    orderEntity.source = source;
    orderEntity.status = status;
    orderEntity.memberId = memberId;

    const orderLineItemEntities = lines.map(
      (line: CreateOrderLineItemCommand) => {
        const { id, name, orderId, price, status, type } = line;
        const entity = new OrderLineItemEntity();
        entity.id = id;
        entity.name = name;
        entity.orderId = orderId;
        entity.price = price;
        entity.status = status;
        entity.type = type;
        return entity;
      },
    );

    // atomicity
    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(OrderEntity, orderEntity);
        await transactionalEntityManager.save(
          OrderLineItemEntity,
          orderLineItemEntities,
        );
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, command: UpdateOrderCommand): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  findById(): Promise<Nullable<Order>> {
    throw new Error('Method not implemented.');
  }
}
