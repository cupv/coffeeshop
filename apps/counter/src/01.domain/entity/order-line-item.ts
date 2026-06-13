export interface OrderLineItem {
  /**
   * uuidv7
   */
  id: string;

  type: number;

  name: string;

  price: number;

  status: number;

  isBaristaOrder: boolean;
  /**
   * uuidv7
   */
  orderId: string;

  modifiedAt: Date;

  createdAt: Date;
}
