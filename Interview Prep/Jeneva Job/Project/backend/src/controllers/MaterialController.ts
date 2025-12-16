import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Material } from '../entities/Material';
import { MaterialService } from '../services/MaterialService';
import { ApiResponse } from '../utils/ApiResponse';

export class MaterialController {
  private service: MaterialService;

  constructor() {
    this.service = new MaterialService(AppDataSource.getRepository(Material));
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const materials = await this.service.findAll({
        relations: ['unitOfMeasure', 'category']
      });
      return ApiResponse.success(res, materials);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const material = await this.service.findById(id);

      if (!material) {
        return ApiResponse.notFound(res, 'Material not found');
      }

      return ApiResponse.success(res, material);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getByCategory = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const materials = await this.service.findByCategory(categoryId);
      return ApiResponse.success(res, materials);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const material = await this.service.create(req.body);
      return ApiResponse.created(res, material, 'Material created successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const material = await this.service.update(id, req.body);

      if (!material) {
        return ApiResponse.notFound(res, 'Material not found');
      }

      return ApiResponse.success(res, material, 'Material updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        return ApiResponse.notFound(res, 'Material not found');
      }

      return ApiResponse.success(res, null, 'Material deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };
}
