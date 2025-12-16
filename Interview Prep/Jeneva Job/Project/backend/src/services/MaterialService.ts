import { Repository } from 'typeorm';
import { Material } from '../entities/Material';
import { BaseService } from './BaseService';

export class MaterialService extends BaseService<Material> {
  constructor(repository: Repository<Material>) {
    super(repository);
  }

  async findByCode(code: string): Promise<Material | null> {
    return this.repository.findOne({
      where: { code },
      relations: ['unitOfMeasure', 'category']
    });
  }

  async findActive(): Promise<Material[]> {
    return this.repository.find({
      where: { isActive: true },
      relations: ['unitOfMeasure', 'category']
    });
  }

  async findByCategory(categoryId: string): Promise<Material[]> {
    return this.repository.find({
      where: { categoryId, isActive: true },
      relations: ['unitOfMeasure', 'category']
    });
  }

  async updateStock(id: string, quantity: number): Promise<Material | null> {
    const material = await this.findById(id);
    if (!material) return null;

    material.stockQuantity += quantity;
    return this.repository.save(material);
  }
}
