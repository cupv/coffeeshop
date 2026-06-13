import { Body, Controller, Post } from '@nestjs/common';
import { type OrderServicePort } from '../../01.domain';
import { type CreateOrderDto } from './counter.dto';

@Controller('orders')
export class CounterController {
  constructor(private readonly orderService: OrderServicePort) {}

  @Post()
  async create(@Body() body: CreateOrderDto) {}
}
