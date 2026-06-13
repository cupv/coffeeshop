import { Inject } from '@nestjs/common';
import {
  PRODUCT_LOCAL_REPOSITORY_TOKEN,
  type ProductRepositoryPort,
} from '../repository';
import { ProductServicePort } from './product.service.port';

export class ProductService implements ProductServicePort {
  constructor(
    @Inject(PRODUCT_LOCAL_REPOSITORY_TOKEN)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async getAll() {
    const products = await this.productRepository.findAll();
    return products;
  }

  async getById(id: number) {
    const product = await this.productRepository.findById(id);
    return product;
  }
}
