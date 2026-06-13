import { CreateOrderCommand } from '../command';
import { Order } from '../entity';

export const ORDER_SERVICE_DI_TOKEN = Symbol('ORDER_SERVICE_DI_TOKEN');

export interface OrderServicePort {
  create(command: CreateOrderCommand): Promise<boolean>;
  getAll(): Promise<Order[]>;
}
