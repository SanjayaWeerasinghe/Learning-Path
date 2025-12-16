import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Supplier } from './Supplier';
import { PurchasingOrderItem } from './PurchasingOrderItem';

export enum PurchasingOrderStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  SENT_TO_SUPPLIER = 'SENT_TO_SUPPLIER',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

@Entity('purchasing_orders')
export class PurchasingOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  orderNumber: string;

  @Column({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'date', nullable: true })
  expectedDeliveryDate: Date;

  @ManyToOne(() => Supplier, (supplier) => supplier.purchasingOrders, { eager: true })
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column()
  supplierId: string;

  @Column({
    type: 'enum',
    enum: PurchasingOrderStatus,
    default: PurchasingOrderStatus.DRAFT,
  })
  status: PurchasingOrderStatus;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  paymentTerms: string;

  @Column({ length: 255, nullable: true })
  deliveryAddress: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ length: 100, nullable: true })
  createdBy: string;

  @Column({ length: 100, nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedDate: Date;

  @OneToMany(() => PurchasingOrderItem, (item) => item.purchasingOrder, { cascade: true })
  items: PurchasingOrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
