import { Nullable } from 'src/00.common';
import {
  CreateOrderCommand,
  CreateOrderLineItemCommand,
  Order,
  OrderRepositoryPort,
  UpdateOrderCommand,
} from '../../../01.domain';
import { OrderModel } from '../model/order.model';
import { DataSource } from 'typeorm';
import { OrderLineItemModel } from '../model/order-line-item.model';
import { InjectDataSource } from '@nestjs/typeorm';
import { OrderOutboxModel } from '../model/order-outbox.model';

export class OrderRepository implements OrderRepositoryPort {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async create(command: CreateOrderCommand): Promise<string> {
    const { id, source, status, memberId, lines, outbox } = command;

    // 1. Map to Order Entity
    const orderEntity = new OrderModel();
    orderEntity.id = id;
    orderEntity.source = source;
    orderEntity.status = status;
    orderEntity.memberId = memberId;

    // 2. Map to Order Line Item Entities
    const orderLineItemEntities = lines.map(
      (line: CreateOrderLineItemCommand) => {
        const { id, name, orderId, price, status, type } = line;
        const entity = new OrderLineItemModel();
        entity.id = id;
        entity.name = name;
        entity.orderId = orderId;
        entity.price = price;
        entity.status = status;
        entity.type = type;
        return entity;
      },
    );

    // 3. Prepare Outbox Event Entity
    const outboxEntity = new OrderOutboxModel();
    outboxEntity.id = outbox.id;
    outboxEntity.type = outbox.type;
    outboxEntity.orderId = outbox.orderId;
    outboxEntity.eventType = outbox.eventType;
    outboxEntity.status = outbox.status;
    outboxEntity.retryCount = outbox.retryCount;
    outboxEntity.payload = outbox.payload;

    // 4. Atomic Local Transaction Execution
    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(OrderModel, orderEntity);

        await transactionalEntityManager.save(
          OrderLineItemModel,
          orderLineItemEntities,
        );

        await transactionalEntityManager.save(OrderOutboxModel, outboxEntity);
      });
      return id;
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
