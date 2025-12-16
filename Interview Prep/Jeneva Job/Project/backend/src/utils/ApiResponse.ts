import { Response } from 'express';

export class ApiResponse {
  static success<T>(res: Response, data: T, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, message = 'Error', statusCode = 500, errors?: any) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  static notFound(res: Response, message = 'Resource not found') {
    return this.error(res, message, 404);
  }

  static badRequest(res: Response, message = 'Bad request', errors?: any) {
    return this.error(res, message, 400, errors);
  }

  static created<T>(res: Response, data: T, message = 'Created successfully') {
    return this.success(res, data, message, 201);
  }
}
