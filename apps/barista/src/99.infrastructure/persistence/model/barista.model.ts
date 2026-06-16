import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('baristas')
export class BaristaModel {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id!: string;

  @Column({ type: 'varchar', length: 36 })
  name!: string;

  @Column({ type: 'int' })
  type!: number;

  @Column({ type: 'varchar', length: 36 })
  @Index('order_id')
  orderId!: string;

  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
  })
  completedAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  modifiedAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;
}
