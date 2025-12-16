import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { UnitOfMeasure } from '../entities/UnitOfMeasure';
import { UnitOfMeasureService } from '../services/UnitOfMeasureService';
import { ApiResponse } from '../utils/ApiResponse';

export class UnitOfMeasureController {
  private service: UnitOfMeasureService;

  constructor() {
    this.service = new UnitOfMeasureService(AppDataSource.getRepository(UnitOfMeasure));
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const uoms = await this.service.findAll();
      return ApiResponse.success(res, uoms);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const uom = await this.service.findById(id);

      if (!uom) {
        return ApiResponse.notFound(res, 'Unit of Measure not found');
      }

      return ApiResponse.success(res, uom);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const uom = await this.service.create(req.body);
      return ApiResponse.created(res, uom, 'Unit of Measure created successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const uom = await this.service.update(id, req.body);

      if (!uom) {
        return ApiResponse.notFound(res, 'Unit of Measure not found');
      }

      return ApiResponse.success(res, uom, 'Unit of Measure updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        return ApiResponse.notFound(res, 'Unit of Measure not found');
      }

      return ApiResponse.success(res, null, 'Unit of Measure deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };
}
