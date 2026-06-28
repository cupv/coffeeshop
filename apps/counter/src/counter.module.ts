import { Module } from '@nestjs/common';
import { services } from './01.domain';
import { adapters, entities, repositories } from './99.infrastructure';
import { controllers } from './02.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root_password_here',
      database: 'counter_db',
      entities: [...entities],
      extra: {
        connectionLimit: 100, 
        waitForConnections: true, 
        queueLimit: 0, 
        acquireTimeout: 30000, 
      },
      synchronize: false,
      logging: false,
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [...controllers],
  providers: [...repositories, ...services, ...adapters],
})
export class CounterModule {}
