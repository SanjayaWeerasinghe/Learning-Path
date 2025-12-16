import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UnitOfMeasure } from './UnitOfMeasure';
import { Category } from './Category';
import { PurchasingRequestItem } from './PurchasingRequestItem';
import { PurchasingOrderItem } from './PurchasingOrderItem';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  standardCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  lastPurchasePrice: number;

  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @Column({ type: 'int', nullable: true })
  reorderLevel: number;

  @ManyToOne(() => UnitOfMeasure, (uom) => uom.materials, { eager: true })
  @JoinColumn({ name: 'unitOfMeasureId' })
  unitOfMeasure: UnitOfMeasure;

  @Column()
  unitOfMeasureId: string;

  @ManyToOne(() => Category, (category) => category.materials, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PurchasingRequestItem, (item) => item.material)
  purchasingRequestItems: PurchasingRequestItem[];

  @OneToMany(() => PurchasingOrderItem, (item) => item.material)
  purchasingOrderItems: PurchasingOrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
