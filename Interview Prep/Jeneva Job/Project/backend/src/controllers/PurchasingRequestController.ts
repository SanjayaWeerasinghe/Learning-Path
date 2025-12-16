import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { PurchasingRequest, PurchasingRequestStatus } from '../entities/PurchasingRequest';
import { PurchasingRequestService } from '../services/PurchasingRequestService';
import { ApiResponse } from '../utils/ApiResponse';

export class PurchasingRequestController {
  private service: PurchasingRequestService;

  constructor() {
    this.service = new PurchasingRequestService(AppDataSource.getRepository(PurchasingRequest));
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const { status } = req.query;

      let requests;
      if (status) {
        requests = await this.service.findByStatus(status as PurchasingRequestStatus);
      } else {
        requests = await this.service.findAll({ relations: ['items'] });
      }

      return ApiResponse.success(res, requests);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const request = await this.service.findWithItems(id);

      if (!request) {
        return ApiResponse.notFound(res, 'Purchasing Request not found');
      }

      return ApiResponse.success(res, request);
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const requestNumber = await this.service.generateRequestNumber();
      const requestData = {
        ...req.body,
        requestNumber,
      };

      const request = await this.service.create(requestData);
      return ApiResponse.created(res, request, 'Purchasing Request created successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const request = await this.service.update(id, req.body);

      if (!request) {
        return ApiResponse.notFound(res, 'Purchasing Request not found');
      }

      return ApiResponse.success(res, request, 'Purchasing Request updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, approvedBy } = req.body;

      const request = await this.service.updateStatus(id, status, approvedBy);

      if (!request) {
        return ApiResponse.notFound(res, 'Purchasing Request not found');
      }

      return ApiResponse.success(res, request, 'Status updated successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        return ApiResponse.notFound(res, 'Purchasing Request not found');
      }

      return ApiResponse.success(res, null, 'Purchasing Request deleted successfully');
    } catch (error: any) {
      return ApiResponse.error(res, error.message);
    }
  };
}
