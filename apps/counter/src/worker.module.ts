import { Module } from '@nestjs/common';
import { entities, tasks } from './99.infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root_password_here',
      database: 'counter_db',
      entities: [...entities],
    }),
    TypeOrmModule.forFeature([...entities]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
          ],
          queue: 'order_outbox_queue',
          queueOptions: {
            durable: true,
          },
          persistent: true,
        },
      },
    ]),
  ],
  providers: [...tasks],
})
export class WorkerModule {}
