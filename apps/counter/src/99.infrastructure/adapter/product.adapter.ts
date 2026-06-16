import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import type { Nullable } from 'src/00.common';
import type { Product, ProductUseCase } from '../../01.domain';

@Injectable()
export class ProductAdapter implements ProductUseCase {
  private readonly axiosClient: AxiosInstance;
  private readonly logger = new Logger(ProductAdapter.name);

  constructor() {
    const baseURL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003';

    this.axiosClient = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getAll(): Promise<Product[]> {
    this.logger.log('GetAllProducts');
    const response = await this.axiosClient.get<Product[]>('/products');
    return response.data;
  }

  async getById(id: number): Promise<Nullable<Product>> {
    this.logger.log('GetById', id);
    const response = await this.axiosClient.get<Product>(`/products/${id}`);
    return response.data;
  }
}
