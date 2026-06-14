import { Injectable } from '@nestjs/common';
import {
  OrderOutbox,
  OrderOutboxRepositoryPort,
} from '../../01.domain';
import { DataSource, Repository } from 'typeorm';
import { OrderOutboxEntity } from './order-outbox.entity';

@Injectable()
export class OrderOutboxRepository implements OrderOutboxRepositoryPort {
  private readonly repo: Repository<OrderOutboxEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(OrderOutboxEntity);
  }

  async fetchPendingBatch(limit: number): Promise<OrderOutbox[]> {
    const entities = await this.repo.find({
      where: {
        type: 'Barista',
        status: 'PENDING',
      },
      order: { createdAt: 'ASC' },
      take: limit,
    });

    return entities.map((entity) => this.toDomain(entity));
  }

  async save(domainModel: OrderOutbox): Promise<OrderOutbox> {
    const entity = this.toEntity(domainModel);
    const savedEntity = await this.repo.save(entity);
    return this.toDomain(savedEntity);
  }

  private toDomain(entity: OrderOutboxEntity): OrderOutbox {
    return new OrderOutbox(
      entity.id,
      entity.type,
      entity.eventType,
      entity.payload,
      entity.status as 'PENDING' | 'PROCESSED' | 'FAILED',
      entity.retryCount,
      entity.orderId,
      entity.createdAt,
      entity.errorMessage,
      entity.processedAt,
    );
  }

  private toEntity(domain: OrderOutbox): OrderOutboxEntity {
    const entity = new OrderOutboxEntity();
    entity.id = domain.id;
    entity.type = domain.type;
    entity.eventType = domain.eventType;
    entity.payload = domain.payload;
    entity.status = domain.status;
    entity.retryCount = domain.retryCount;
    entity.orderId = domain.orderId;
    entity.createdAt = domain.createdAt;
    entity.errorMessage = domain.errorMessage;
    entity.processedAt = domain.processedAt;
    return entity;
  }
}
