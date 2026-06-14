import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateOrderLineItemOptions,
  ORDER_SERVICE_TOKEN,
  type OrderServicePort,
} from '../../01.domain';
import { type CreateOrderDto } from './counter.dto';

@Controller('orders')
export class CounterController {
  constructor(
    @Inject(ORDER_SERVICE_TOKEN)
    private readonly orderService: OrderServicePort,
  ) {}

  @Post()
  async create(@Body() body: CreateOrderDto) {
    const { lines, memberId, source } = body;

    const orderLines = lines.map<CreateOrderLineItemOptions>((line) => {
      const { name, price, type } = line;
      return {
        name,
        price,
        type,
      };
    });

    const orderId = await this.orderService.create({
      source: source,
      lines: orderLines,
      memberId,
    });

    return orderId;
  }
}
