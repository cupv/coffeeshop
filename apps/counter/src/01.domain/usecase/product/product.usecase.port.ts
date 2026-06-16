import { Nullable } from 'src/00.common';
import { Product } from '../../entity/product';

export const PRODUCT_USECASE_TOKEN = Symbol('PRODUCT_USECASE_TOKEN');

export interface ProductUseCase {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Nullable<Product>>;
}
