import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('warehouses')
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 100 })
  name: string;

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
  contactPerson: string;

  @Column({ length: 20, nullable: true })
  contactPhone: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
