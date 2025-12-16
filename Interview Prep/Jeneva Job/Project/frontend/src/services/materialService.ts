import { apiClient } from './api';
import { Material } from '../types';

export const materialService = {
  getAll: () => apiClient.get<Material[]>('/materials'),

  getById: (id: string) => apiClient.get<Material>(`/materials/${id}`),

  getByCategory: (categoryId: string) =>
    apiClient.get<Material[]>(`/materials/category/${categoryId}`),

  create: (data: Partial<Material>) => apiClient.post<Material>('/materials', data),

  update: (id: string, data: Partial<Material>) =>
    apiClient.put<Material>(`/materials/${id}`, data),

  delete: (id: string) => apiClient.delete<null>(`/materials/${id}`),
};
