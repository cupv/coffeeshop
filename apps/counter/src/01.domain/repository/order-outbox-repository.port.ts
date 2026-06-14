import { OrderOutbox } from "../entity/order-outbox";

export interface OrderOutboxRepositoryPort {
  fetchPendingBatch(limit: number): Promise<OrderOutbox[]>;
  save(event: OrderOutbox): Promise<OrderOutbox>;
}