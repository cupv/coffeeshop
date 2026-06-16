import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { OrderOutboxModel } from '../persistence/model/order-outbox.model';

@Injectable()
export class OrderOutboxTask {
  private readonly logger = new Logger(OrderOutboxTask.name);
  private isProcessing = false;

  constructor(
    private readonly dataSource: DataSource,
    @Inject('RABBITMQ_CLIENT') private readonly rmqClient: ClientProxy,
  ) {}

  @Cron('*/30 * * * * *')
  async handle() {
    if (this.isProcessing) {
      this.logger.warn(
        'Previous outbox flush operation is still running. Skipping current tick.',
      );
      return;
    }

    this.isProcessing = true;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const outboxRepo = queryRunner.manager.getRepository(OrderOutboxModel);

      const pendingEvents = await outboxRepo.find({
        where: {
          type: 'Barista',
          status: 'PENDING',
        },
        order: { createdAt: 'ASC' },
        take: 20,
      });

      if (pendingEvents.length === 0) {
        return;
      }

      this.logger.log(
        `Processing ${pendingEvents.length} pending Order outbox events...`,
      );

      for (const event of pendingEvents) {
        const routingKey = `order.${event.eventType.toLowerCase().replace('order', '')}`;

        try {
          await lastValueFrom(this.rmqClient.emit(routingKey, event.payload));

          event.status = 'PROCESSED';
          event.processedAt = new Date();
          await outboxRepo.save(event);

          this.logger.log(
            `[MQ Dispatched] Routing Key: ${routingKey} | Order ID: ${event.orderId}`,
          );
        } catch (dispatchError: any) {
          this.logger.error(
            `Failed to dispatch outbox message ${event.id}: ${dispatchError.message}`,
          );

          event.retryCount += 1;
          event.errorMessage = dispatchError.stack || dispatchError.message;

          if (event.retryCount >= 5) {
            event.status = 'FAILED';
            this.logger.error(
              `Outbox record ${event.id} permanently marked FAILED after maximum retries.`,
            );
          }

          await outboxRepo.save(event);
        }
      }
    } catch (error: any) {
      this.logger.error(
        `Fatal crash in Order outbox execution loop: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
      this.isProcessing = false;
    }
  }
}
