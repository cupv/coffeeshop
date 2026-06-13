import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  PRODUCT_SERVICE_TOKEN,
  type ProductServicePort,
} from '../../01.domain';

@Controller('/products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: ProductServicePort,
  ) {}

  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getById(id);
  }
}
