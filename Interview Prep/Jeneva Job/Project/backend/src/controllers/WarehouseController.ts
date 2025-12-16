import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Warehouse } from '../entities/Warehouse';
import { WarehouseService } from '../services/WarehouseService';
import { ApiResponse } from '../utils/ApiResponse';

export class WarehouseController {
  private service: WarehouseService;

  constructor() {
    this.service = new WarehouseService(AppDataSource.getRepository(Warehouse));
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const warehouses = await this.service.findAll();
      return ApiResponse.success(res, warehouses);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const warehouse = await this.service.findById(id);

      if (!warehouse) {
        return ApiResponse.notFound(res, 'Warehouse not found');
      }

      return ApiResponse.success(res, warehouse);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const warehouse = await this.service.create(req.body);
      return ApiResponse.created(res, warehouse, 'Warehouse created successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const warehouse = await this.service.update(id, req.body);

      if (!warehouse) {
        return ApiResponse.notFound(res, 'Warehouse not found');
      }

      return ApiResponse.success(res, warehouse, 'Warehouse updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        return ApiResponse.notFound(res, 'Warehouse not found');
      }

      return ApiResponse.success(res, null, 'Warehouse deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };
}
