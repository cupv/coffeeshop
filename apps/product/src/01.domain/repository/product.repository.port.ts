import { Nullable } from 'src/00.common';
import { Product } from '../entity/product';

export const PRODUCT_REPOSITORY_DI_TOKEN = Symbol(
  'PRODUCT_REPOSITORY_DI_TOKEN',
);

export const PRODUCT_REPOSITORY_DI_TOKEN_LOCAL = Symbol(
  'PRODUCT_REPOSITORY_DI_TOKEN_LOCAL',
);

export interface ProductRepositoryPort {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Nullable<Product>>;
}
