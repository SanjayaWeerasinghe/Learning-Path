import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { PurchasingOrder, PurchasingOrderStatus } from '../entities/PurchasingOrder';
import { PurchasingOrderService } from '../services/PurchasingOrderService';
import { ApiResponse } from '../utils/ApiResponse';

export class PurchasingOrderController {
  private service: PurchasingOrderService;

  constructor() {
    this.service = new PurchasingOrderService(AppDataSource.getRepository(PurchasingOrder));
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const { status, supplierId } = req.query;

      let orders;
      if (status) {
        orders = await this.service.findByStatus(status as PurchasingOrderStatus);
      } else if (supplierId) {
        orders = await this.service.findBySupplier(supplierId as string);
      } else {
        orders = await this.service.findAll({ relations: ['items', 'supplier'] });
      }

      return ApiResponse.success(res, orders);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await this.service.findWithItems(id);

      if (!order) {
        return ApiResponse.notFound(res, 'Purchasing Order not found');
      }

      return ApiResponse.success(res, order);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const orderNumber = await this.service.generateOrderNumber();
      const orderData = {
        ...req.body,
        orderNumber,
      };

      const order = await this.service.create(orderData);

      if (order.id) {
        await this.service.calculateTotal(order.id);
      }

      return ApiResponse.created(res, order, 'Purchasing Order created successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await this.service.update(id, req.body);

      if (!order) {
        return ApiResponse.notFound(res, 'Purchasing Order not found');
      }

      await this.service.calculateTotal(id);

      return ApiResponse.success(res, order, 'Purchasing Order updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await this.service.updateStatus(id, status);

      if (!order) {
        return ApiResponse.notFound(res, 'Purchasing Order not found');
      }

      return ApiResponse.success(res, order, 'Status updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        return ApiResponse.notFound(res, 'Purchasing Order not found');
      }

      return ApiResponse.success(res, null, 'Purchasing Order deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };
}
