import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Barista,
  BaristaRepositoryPort,
  CreateOrderCommand,
} from '../../../01.domain';
import { BaristaModel } from '../model';

export class BaristaRepository implements BaristaRepositoryPort {
  constructor(
    @InjectRepository(BaristaModel)
    private readonly repository: Repository<BaristaModel>,
  ) {}

  async createOrder(command: CreateOrderCommand): Promise<boolean> {
    const model = this.toModel(command);
    await this.repository.save(model);
    return true;
  }

  private toDomain(model: BaristaModel) {
    const barista: Barista = {
      id: model.id,
      name: model.name,
      type: model.type,
      orderId: model.orderId,
      completedAt: model.completedAt,
      updateAt: model.modifiedAt,
      createdAt: model.createdAt,
    };
    return barista;
  }

  private toModel(command: CreateOrderCommand) {
    const { id, name, orderId, type, completedAt } = command;
    const model = new BaristaModel();
    model.id = id;
    model.name = name;
    model.orderId = orderId;
    model.type = type;
    model.completedAt = completedAt;
    return model;
  }
}
