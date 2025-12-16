import { Repository } from 'typeorm';
import { Supplier } from '../entities/Supplier';
import { BaseService } from './BaseService';

export class SupplierService extends BaseService<Supplier> {
  constructor(repository: Repository<Supplier>) {
    super(repository);
  }

  async findByCode(code: string): Promise<Supplier | null> {
    return this.repository.findOne({ where: { code } });
  }

  async findActive(): Promise<Supplier[]> {
    return this.repository.find({ where: { isActive: true } });
  }
}
