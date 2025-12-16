import { apiClient } from './api';
import { Supplier } from '../types';

export const supplierService = {
  getAll: () => apiClient.get<Supplier[]>('/suppliers'),

  getById: (id: string) => apiClient.get<Supplier>(`/suppliers/${id}`),

  create: (data: Partial<Supplier>) => apiClient.post<Supplier>('/suppliers', data),

  update: (id: string, data: Partial<Supplier>) =>
    apiClient.put<Supplier>(`/suppliers/${id}`, data),

  delete: (id: string) => apiClient.delete<null>(`/suppliers/${id}`),
};
