import { Repository } from 'typeorm';
import { UnitOfMeasure } from '../entities/UnitOfMeasure';
import { BaseService } from './BaseService';

export class UnitOfMeasureService extends BaseService<UnitOfMeasure> {
  constructor(repository: Repository<UnitOfMeasure>) {
    super(repository);
  }

  async findByCode(code: string): Promise<UnitOfMeasure | null> {
    return this.repository.findOne({ where: { code } });
  }

  async findActive(): Promise<UnitOfMeasure[]> {
    return this.repository.find({ where: { isActive: true } });
  }
}
