import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PurchasingRequestItem } from './PurchasingRequestItem';

export enum PurchasingRequestStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ORDERED = 'ORDERED',
  CANCELLED = 'CANCELLED',
}

@Entity('purchasing_requests')
export class PurchasingRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  requestNumber: string;

  @Column({ type: 'date' })
  requestDate: Date;

  @Column({ type: 'date', nullable: true })
  requiredDate: Date;

  @Column({ length: 100 })
  requestedBy: string;

  @Column({ length: 100, nullable: true })
  department: string;

  @Column({
    type: 'enum',
    enum: PurchasingRequestStatus,
    default: PurchasingRequestStatus.DRAFT,
  })
  status: PurchasingRequestStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ length: 100, nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedDate: Date;

  @OneToMany(() => PurchasingRequestItem, (item) => item.purchasingRequest, { cascade: true })
  items: PurchasingRequestItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
