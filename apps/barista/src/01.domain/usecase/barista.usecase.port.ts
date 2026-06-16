export const BARISTA_USECASE_TOKEN = Symbol('BARISTA_USECASE_TOKEN');

export type CreateOrderOptions = {
  orderId: string;
  type: number;
  name: string;
};

export interface BaristaUseCasePort {
  createOrder(options: CreateOrderOptions): Promise<boolean>;
}
