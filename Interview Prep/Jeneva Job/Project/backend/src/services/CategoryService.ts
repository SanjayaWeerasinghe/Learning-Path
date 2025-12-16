import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { BaseService } from './BaseService';

export class CategoryService extends BaseService<Category> {
  constructor(repository: Repository<Category>) {
    super(repository);
  }

  async findByCode(code: string): Promise<Category | null> {
    return this.repository.findOne({ where: { code } });
  }

  async findActive(): Promise<Category[]> {
    return this.repository.find({ where: { isActive: true } });
  }
}
