import { Order } from '../entity';

export const ORDER_USECASE_TOKEN = Symbol('ORDER_USECASE_TOKEN');

export interface CreateOrderOptions {
  source: number;
  memberId: string;
  lines: CreateOrderLineItemOptions[];
}

export interface CreateOrderLineItemOptions {
  type: number;
  name: string;
  price: number;
}

export interface OrderUseCasePort {
  create(command: CreateOrderOptions): Promise<string>;
  getAll(): Promise<Order[]>;
}
