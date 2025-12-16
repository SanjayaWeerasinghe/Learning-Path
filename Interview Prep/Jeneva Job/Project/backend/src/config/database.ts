import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Material } from '../entities/Material';
import { UnitOfMeasure } from '../entities/UnitOfMeasure';
import { Category } from '../entities/Category';
import { Warehouse } from '../entities/Warehouse';
import { Supplier } from '../entities/Supplier';
import { PurchasingRequest } from '../entities/PurchasingRequest';
import { PurchasingRequestItem } from '../entities/PurchasingRequestItem';
import { PurchasingOrder } from '../entities/PurchasingOrder';
import { PurchasingOrderItem } from '../entities/PurchasingOrderItem';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'erp_procurement',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [
    Material,
    UnitOfMeasure,
    Category,
    Warehouse,
    Supplier,
    PurchasingRequest,
    PurchasingRequestItem,
    PurchasingOrder,
    PurchasingOrderItem,
  ],
  migrations: [],
  subscribers: [],
});
