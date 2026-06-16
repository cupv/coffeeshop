import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('orders_outbox')
@Index('idx_status_created', ['status', 'createdAt'])
@Index('idx_order', ['type', 'orderId'])
export class OrderOutboxModel {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  type!: string;

  @Column({ type: 'varchar', length: 36 })
  orderId!: string;

  @Column({ type: 'varchar', length: 100 })
  eventType!: string;

  @Column({ type: 'json' })
  payload!: Record<string, any>;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status!: string;

  @Column({ type: 'int', default: 0 })
  retryCount!: number;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @Column({ type: 'timestamp', precision: 6, nullable: true })
  processedAt?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;
}
