export interface CreateOrderCommand {
  id: string;

  source: number;

  memberId: string;

  status: number;

  lines: CreateOrderLineItemCommand[];
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
