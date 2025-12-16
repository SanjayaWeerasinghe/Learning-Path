import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Category } from '../entities/Category';
import { CategoryService } from '../services/CategoryService';
import { ApiResponse } from '../utils/ApiResponse';

export class CategoryController {
  private service: CategoryService;

  constructor() {
    this.service = new CategoryService(AppDataSource.getRepository(Category));
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await this.service.findAll();
      return ApiResponse.success(res, categories);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await this.service.findById(id);

      if (!category) {
        return ApiResponse.notFound(res, 'Category not found');
      }

      return ApiResponse.success(res, category);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const category = await this.service.create(req.body);
      return ApiResponse.created(res, category, 'Category created successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await this.service.update(id, req.body);

      if (!category) {
        return ApiResponse.notFound(res, 'Category not found');
      }

      return ApiResponse.success(res, category, 'Category updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        return ApiResponse.notFound(res, 'Category not found');
      }

      return ApiResponse.success(res, null, 'Category deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };
}
