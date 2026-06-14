export enum OrderStatus {
  //#region Standard Workflow

  /*
   * Order has been initialized at the counter and is awaiting payment or validation.
   */
  NEW = 1,

  /*
   * Payment successfully verified. Order is ready to be dispatched to Barista/Kitchen microservices.
   */
  PAID,

  /*
   * Items are actively being prepared/brewed by the Barista or baked by the Kitchen.
   */
  PROCESSING,

  /**
   * Preparation is finished. Items are waiting at the pickup counter for the customer.
   */
  READY,

  /**
   * Customer has picked up their items. The order lifecycle is successfully closed.
   */
  DONE,

  //#endregion

  //#region Failure Handling

  /**
   * Order was aborted by the customer or aborted due to an immediate checkout/payment failure.
   */
  CANCELLED,

  /**
   * Internal system or transport layer error (e.g., MQ network timeout, downstream service crash).
   */
  FAILED,

  /*
   * Order was reversed and funds sent back (e.g., out of stock ingredients discovered mid-preparation).
   */
  REFUNDED,
  //#endregion
}

export interface Order {
  /**
   * uuidv7
   */
  id: string;
  source: number;
  /**
   * uuidv7
   */
  loyaltyMemberId: string;
  status: OrderStatus;
  modifiedAt: Date;
  createdAt: Date;
}
