import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PurchasingRequest } from './PurchasingRequest';
import { Material } from './Material';

@Entity('purchasing_request_items')
export class PurchasingRequestItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PurchasingRequest, (pr) => pr.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchasingRequestId' })
  purchasingRequest: PurchasingRequest;

  @Column()
  purchasingRequestId: string;

  @ManyToOne(() => Material, (material) => material.purchasingRequestItems, { eager: true })
  @JoinColumn({ name: 'materialId' })
  material: Material;

  @Column()
  materialId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedPrice: number;

  @Column({ type: 'text', nullable: true })
  specifications: string;

  @Column({ type: 'int', default: 0 })
  orderedQuantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
