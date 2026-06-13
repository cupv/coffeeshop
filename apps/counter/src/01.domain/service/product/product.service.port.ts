import { Nullable } from 'src/00.common';
import { Product } from '../../entity/product';

export const PRODUCT_SERVICE_TOKEN = Symbol('PRODUCT_SERVICE_TOKEN');

export interface ProductService {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Nullable<Product>>;
}
