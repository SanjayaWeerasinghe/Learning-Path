import { Repository } from 'typeorm';
import { PurchasingOrder, PurchasingOrderStatus } from '../entities/PurchasingOrder';
import { BaseService } from './BaseService';

export class PurchasingOrderService extends BaseService<PurchasingOrder> {
  constructor(repository: Repository<PurchasingOrder>) {
    super(repository);
  }

  async findByOrderNumber(orderNumber: string): Promise<PurchasingOrder | null> {
    return this.repository.findOne({
      where: { orderNumber },
      relations: ['items', 'items.material', 'items.material.unitOfMeasure', 'supplier']
    });
  }

  async findWithItems(id: string): Promise<PurchasingOrder | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['items', 'items.material', 'items.material.unitOfMeasure', 'supplier']
    });
  }

  async findByStatus(status: PurchasingOrderStatus): Promise<PurchasingOrder[]> {
    return this.repository.find({
      where: { status },
      relations: ['items', 'supplier']
    });
  }

  async findBySupplier(supplierId: string): Promise<PurchasingOrder[]> {
    return this.repository.find({
      where: { supplierId },
      relations: ['items']
    });
  }

  async updateStatus(id: string, status: PurchasingOrderStatus): Promise<PurchasingOrder | null> {
    const po = await this.findById(id);
    if (!po) return null;

    po.status = status;
    return this.repository.save(po);
  }

  async calculateTotal(id: string): Promise<number> {
    const po = await this.findWithItems(id);
    if (!po || !po.items) return 0;

    const total = po.items.reduce((sum, item) => sum + Number(item.totalPrice), 0);
    po.totalAmount = total;
    await this.repository.save(po);

    return total;
  }

  async generateOrderNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const count = await this.repository.count();
    const sequence = String(count + 1).padStart(5, '0');

    return `PO${year}${month}${sequence}`;
  }
}
