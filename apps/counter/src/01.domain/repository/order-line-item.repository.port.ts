import { CreateOrderLineItemCommand } from '../command';

export const ORDER_LINE_ITEM_REPOSITORY_DI_TOKEN = Symbol('ORDER_LINE_ITEM_REPOSITORY_DI_TOKEN');

export interface OrderLineItemRepositoryPort {
  create(command: CreateOrderLineItemCommand): Promise<boolean>;
}
