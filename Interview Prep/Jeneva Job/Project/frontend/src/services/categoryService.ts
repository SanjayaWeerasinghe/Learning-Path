import { apiClient } from './api';
import { Category } from '../types';

export const categoryService = {
  getAll: () => apiClient.get<Category[]>('/categories'),

  getById: (id: string) => apiClient.get<Category>(`/categories/${id}`),

  create: (data: Partial<Category>) => apiClient.post<Category>('/categories', data),

  update: (id: string, data: Partial<Category>) =>
    apiClient.put<Category>(`/categories/${id}`, data),

  delete: (id: string) => apiClient.delete<null>(`/categories/${id}`),
};
