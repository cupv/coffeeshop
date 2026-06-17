import { Module } from '@nestjs/common';
import { repositories } from './99.infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaristaModel } from './99.infrastructure/persistence/model';
import { usecases } from './01.domain';
import { BaristaConsumerController } from './02.adapter/consumer/barista.consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root_password_here',
      database: 'barista_db',
      entities: [BaristaModel],
    }),
    TypeOrmModule.forFeature([BaristaModel]),
  ],
  controllers: [BaristaConsumerController],
  providers: [...usecases, ...repositories],
})
export class BaristaModule { }
