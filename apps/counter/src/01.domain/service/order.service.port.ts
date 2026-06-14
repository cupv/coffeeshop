import { Order } from '../entity';

export const ORDER_SERVICE_TOKEN = Symbol('ORDER_SERVICE_TOKEN');

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

export interface OrderServicePort {
  create(command: CreateOrderOptions): Promise<string>;
  getAll(): Promise<Order[]>;
}
