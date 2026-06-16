import { Injectable } from '@nestjs/common';
import {
  OrderOutbox,
  OrderOutboxRepositoryPort,
} from '../../../01.domain';
import { DataSource, Repository } from 'typeorm';
import { OrderOutboxModel } from '../model/order-outbox.model';

@Injectable()
export class OrderOutboxRepository implements OrderOutboxRepositoryPort {
  private readonly repo: Repository<OrderOutboxModel>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(OrderOutboxModel);
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
    const entity = this.toModel(domainModel);
    const savedEntity = await this.repo.save(entity);
    return this.toDomain(savedEntity);
  }

  private toDomain(entity: OrderOutboxModel): OrderOutbox {
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

  private toModel(domain: OrderOutbox): OrderOutboxModel {
    const entity = new OrderOutboxModel();
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
