import { Repository } from 'typeorm';
import { PurchasingRequest, PurchasingRequestStatus } from '../entities/PurchasingRequest';
import { BaseService } from './BaseService';

export class PurchasingRequestService extends BaseService<PurchasingRequest> {
  constructor(repository: Repository<PurchasingRequest>) {
    super(repository);
  }

  async findByRequestNumber(requestNumber: string): Promise<PurchasingRequest | null> {
    return this.repository.findOne({
      where: { requestNumber },
      relations: ['items', 'items.material', 'items.material.unitOfMeasure']
    });
  }

  async findWithItems(id: string): Promise<PurchasingRequest | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['items', 'items.material', 'items.material.unitOfMeasure']
    });
  }

  async findByStatus(status: PurchasingRequestStatus): Promise<PurchasingRequest[]> {
    return this.repository.find({
      where: { status },
      relations: ['items']
    });
  }

  async updateStatus(id: string, status: PurchasingRequestStatus, approvedBy?: string): Promise<PurchasingRequest | null> {
    const pr = await this.findById(id);
    if (!pr) return null;

    pr.status = status;
    if (status === PurchasingRequestStatus.APPROVED && approvedBy) {
      pr.approvedBy = approvedBy;
      pr.approvedDate = new Date();
    }

    return this.repository.save(pr);
  }

  async generateRequestNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const count = await this.repository.count();
    const sequence = String(count + 1).padStart(5, '0');

    return `PR${year}${month}${sequence}`;
  }
}
