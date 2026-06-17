import { Controller, Inject } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import {
  BARISTA_USECASE_TOKEN,
  type BaristaUseCasePort,
} from '../../01.domain';
import { first } from 'rxjs';

@Controller()
export class BaristaConsumerController {
  constructor(
    @Inject(BARISTA_USECASE_TOKEN)
    private readonly baristaUseCase: BaristaUseCasePort,
  ) {}

  @EventPattern('order.paid')
  async handleOrderPaid(
    @Payload()
    data: {
      orderId: string;
      memberId: string;
      source: number;
      status: number;
      lines: {
        id: string;
        name: string;
        type: number;
        price: number;
        status: number;
        orderId: string;
      }[];
    },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const rawMessage = context.getMessage();
    const routingKey = rawMessage.fields.routingKey;
    try {
      const { lines, orderId } = data;
      const line = lines[0];
      await this.baristaUseCase.createOrder({
        name: line.name,
        orderId: orderId,
        type: line.type,
      });
      channel.ack(rawMessage);
    } catch (error) {
      console.error('Failed to process paid order:', error);
    }
  }
}
