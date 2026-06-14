import { OrderOutboxEventType, OrderOutboxStatus, OrderOutboxType, OrderStatus } from "../entity";

export interface CreateOrderCommand {
  id: string;

  source: number;

  memberId: string;

  status: OrderStatus;

  lines: CreateOrderLineItemCommand[];

  outbox: {
    id: string;
    type: OrderOutboxType;
    orderId: string;
    eventType: OrderOutboxEventType;
    status: OrderOutboxStatus;
    retryCount: number;
    payload: {
      orderId: string;
      source: number;
      status: OrderStatus;
      memberId: string;
      lines: CreateOrderLineItemCommand[];
    };
  };
}

export interface UpdateOrderCommand {
  status: number;
}

export interface CreateOrderLineItemCommand {
  id: string;

  type: number;

  name: string;

  price: number;

  status: number;

  orderId: string;
}
