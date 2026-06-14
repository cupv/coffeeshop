export type OrderOutboxType = 'Barista' | 'Kitchen';

export type OrderOutboxEventType =
  | 'OrderCreated'
  | 'OrderPaid'
  | 'OrderPrepared'
  | 'OrderDone';

export type OrderOutboxStatus = 'PENDING' | 'PROCESSED' | 'FAILED';

export class OrderOutbox {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly eventType: string,
    public readonly payload: Record<string, any>,
    public status: OrderOutboxStatus,
    public retryCount: number,
    public readonly orderId: string,
    public readonly createdAt: Date,
    public errorMessage?: string,
    public processedAt?: Date,
  ) {}

  public markAsProcessed(): void {
    this.status = 'PROCESSED';
    this.processedAt = new Date();
  }

  public fail(reason: string): void {
    this.retryCount += 1;
    this.errorMessage = reason;
    if (this.retryCount >= 5) {
      this.status = 'FAILED';
    }
  }
}
