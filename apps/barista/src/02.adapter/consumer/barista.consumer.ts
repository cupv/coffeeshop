// order-consumer.controller.ts
import { Controller } from '@nestjs/common';
import {  Payload, Ctx, RmqContext, MessagePattern, EventPattern } from '@nestjs/microservices';

@Controller()
export class BaristaConsumerController {

    constructor() {
        console.log('tesstttt')
    }

  @EventPattern('order.#') 
  handleOrderPaid(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('--- [New Message Received] ---');
    console.log('Event Type: order.paid');
    console.log('Order Payload Data:', data);

    const rawMessage = context.getMessage();
    const routingKey = rawMessage.fields.routingKey; 
    console.log(`Verified Routing Key from RabbitMQ: ${routingKey}`);

    try {
      this.processPaymentSuccess(data);
    } catch (error) {
      console.error('Failed to process paid order:', error);
    }
  } 

  private processPaymentSuccess(orderData: any) {
    // Business logic placeholder
  }
}