import { Nullable } from 'src/00.common';
import { Product, ProductRepositoryPort } from '../../01.domain';

export class ProductLocalRepository implements ProductRepositoryPort {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'CAPPUCCINO',
      type: 0,
      price: 45000,
      image: 'img/CAPPUCCINO.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'COFFEE_BLACK',
      type: 1,
      price: 30000,
      image: 'img/COFFEE_BLACK.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'COFFEE_WITH_ROOM',
      type: 2,
      price: 30000,
      image: 'img/COFFEE_WITH_ROOM.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 4,
      name: 'ESPRESSO',
      type: 3,
      price: 35000,
      image: 'img/ESPRESSO.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 5,
      name: 'ESPRESSO_DOUBLE',
      type: 4,
      price: 45000,
      image: 'img/ESPRESSO_DOUBLE.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 6,
      name: 'LATTE',
      type: 5,
      price: 45000,
      image: 'img/LATTE.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 7,
      name: 'CAKEPOP',
      type: 6,
      price: 25000,
      image: 'img/CAKEPOP.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 8,
      name: 'CROISSANT',
      type: 7,
      price: 32500,
      image: 'img/CROISSANT.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 9,
      name: 'MUFFIN',
      type: 8,
      price: 30000,
      image: 'img/MUFFIN.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 10,
      name: 'CROISSANT_CHOCOLATE',
      type: 9,
      price: 35000,
      image: 'img/CROISSANT_CHOCOLATE.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: number): Promise<Nullable<Product>> {
    const product = this.products.find((product) => {
      return product.id === id;
    });
    return product;
  }
}
