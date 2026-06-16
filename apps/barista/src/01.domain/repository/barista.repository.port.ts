import { Barista } from '../entity';

export type CreateOrderCommand = Omit<Barista, 'createdAt' | 'updateAt'>;

export const BARISTA_REPOSITORY_TOKEN = Symbol('BARISTA_REPOSITORY_TOKEN');

export interface BaristaRepositoryPort {
  createOrder(command: CreateOrderCommand): Promise<boolean>;
}
