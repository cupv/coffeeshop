import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductRepositoryPort } from '../../../01.domain';
import { ProductModel } from '../model/product.model';
import { Repository } from 'typeorm';
import { Nullable } from '../../../00.common';

export class ProductRepository implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repository: Repository<ProductModel>,
  ) {}

  async  findAll(): Promise<Product[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<Nullable<Product>> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error(`Product with Id ${id} not found`);
    }

    return this.toDomain(entity);
  }

  private toDomain(entity: ProductModel): Product {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      price: Number(entity.price),
      image: entity.image,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
