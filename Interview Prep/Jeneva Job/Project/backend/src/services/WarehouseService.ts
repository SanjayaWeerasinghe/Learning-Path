import { Repository } from 'typeorm';
import { Warehouse } from '../entities/Warehouse';
import { BaseService } from './BaseService';

export class WarehouseService extends BaseService<Warehouse> {
  constructor(repository: Repository<Warehouse>) {
    super(repository);
  }

  async findByCode(code: string): Promise<Warehouse | null> {
    return this.repository.findOne({ where: { code } });
  }

  async findActive(): Promise<Warehouse[]> {
    return this.repository.find({ where: { isActive: true } });
  }
}
