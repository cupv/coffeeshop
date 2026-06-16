export interface Barista {
  id: string;
  type: number;
  name: string;
  orderId: string;
  completedAt?: Date;
  createdAt: Date;
  updateAt: Date;
}
