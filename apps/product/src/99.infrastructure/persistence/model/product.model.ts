import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'int' })
  type!: number;

  @Column({ type: 'int' })
  price!: number;

  @Column({ type: 'varchar' })
  image?: string;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @VersionColumn()
  version!: number;
}
