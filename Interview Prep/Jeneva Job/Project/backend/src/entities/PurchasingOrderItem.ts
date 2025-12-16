import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PurchasingOrder } from './PurchasingOrder';
import { Material } from './Material';

@Entity('purchasing_order_items')
export class PurchasingOrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PurchasingOrder, (po) => po.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchasingOrderId' })
  purchasingOrder: PurchasingOrder;

  @Column()
  purchasingOrderId: string;

  @ManyToOne(() => Material, (material) => material.purchasingOrderItems, { eager: true })
  @JoinColumn({ name: 'materialId' })
  material: Material;

  @Column()
  materialId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tax: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number;

  @Column({ type: 'int', default: 0 })
  receivedQuantity: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
