import { Nullable } from 'src/00.common';
import { Product } from '../entity/product';

export const PRODUCT_REPOSITORY_TOKEN = Symbol(
  'PRODUCT_REPOSITORY_TOKEN',
);

export const PRODUCT_LOCAL_REPOSITORY_TOKEN = Symbol(
  'PRODUCT_LOCAL_REPOSITORYTOKEN',
);

export interface ProductRepositoryPort {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Nullable<Product>>;
}
