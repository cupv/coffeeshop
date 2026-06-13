import { Nullable } from '../../00.common';
import { CreateOrderCommand, UpdateOrderCommand } from '../command';
import { Order } from '../entity';

export const ORDER_REPOSITORY_TOKEN = Symbol('ORDER_REPOSITORY_TOKEN');

export interface OrderRepositoryPort {
  create(command: CreateOrderCommand): Promise<boolean>;
  update(id: string, command: UpdateOrderCommand): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(): Promise<Nullable<Order>>;
}
