import { Nullable } from 'src/00.common';
import { Product } from '../entity';

export interface ProductServicePort {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Nullable<Product>>;
}
