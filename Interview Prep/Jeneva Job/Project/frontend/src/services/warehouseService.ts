import { apiClient } from './api';
import { Warehouse } from '../types';

export const warehouseService = {
  getAll: () => apiClient.get<Warehouse[]>('/warehouses'),

  getById: (id: string) => apiClient.get<Warehouse>(`/warehouses/${id}`),

  create: (data: Partial<Warehouse>) => apiClient.post<Warehouse>('/warehouses', data),

  update: (id: string, data: Partial<Warehouse>) =>
    apiClient.put<Warehouse>(`/warehouses/${id}`, data),

  delete: (id: string) => apiClient.delete<null>(`/warehouses/${id}`),
};
