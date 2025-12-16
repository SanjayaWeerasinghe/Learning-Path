import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PurchasingOrder } from './PurchasingOrder';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 100, nullable: true })
  contactPerson: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 50, nullable: true })
  state: string;

  @Column({ length: 20, nullable: true })
  zipCode: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ length: 50, nullable: true })
  taxId: string;

  @Column({ type: 'text', nullable: true })
  paymentTerms: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PurchasingOrder, (purchasingOrder) => purchasingOrder.supplier)
  purchasingOrders: PurchasingOrder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
