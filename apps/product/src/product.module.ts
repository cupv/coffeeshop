import { Module } from '@nestjs/common';
import { services } from './01.domain';
import { controllers } from './02.adapter';
import { repositories } from './99.infrastructure';

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...repositories, ...services],
})
export class ProductModule {}
