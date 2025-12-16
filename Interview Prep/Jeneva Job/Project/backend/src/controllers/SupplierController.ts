import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Supplier } from '../entities/Supplier';
import { SupplierService } from '../services/SupplierService';
import { ApiResponse } from '../utils/ApiResponse';

export class SupplierController {
  private service: SupplierService;

  constructor() {
    this.service = new SupplierService(AppDataSource.getRepository(Supplier));
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const suppliers = await this.service.findAll();
      return ApiResponse.success(res, suppliers);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const supplier = await this.service.findById(id);

      if (!supplier) {
        return ApiResponse.notFound(res, 'Supplier not found');
      }

      return ApiResponse.success(res, supplier);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const supplier = await this.service.create(req.body);
      return ApiResponse.created(res, supplier, 'Supplier created successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const supplier = await this.service.update(id, req.body);

      if (!supplier) {
        return ApiResponse.notFound(res, 'Supplier not found');
      }

      return ApiResponse.success(res, supplier, 'Supplier updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        return ApiResponse.notFound(res, 'Supplier not found');
      }

      return ApiResponse.success(res, null, 'Supplier deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };
}
