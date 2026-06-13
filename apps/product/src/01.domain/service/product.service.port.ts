import { Nullable } from 'src/00.common';
import { Product } from '../entity';

export const PRODUCT_SERVICE_DI_TOKEN = Symbol('PRODUCT_SERVICE_DI_TOKEN');

export interface ProductServicePort {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Nullable<Product>>;
}
