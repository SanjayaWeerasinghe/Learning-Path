import { apiClient } from './api';
import { UnitOfMeasure } from '../types';

export const unitOfMeasureService = {
  getAll: () => apiClient.get<UnitOfMeasure[]>('/unit-of-measures'),

  getById: (id: string) => apiClient.get<UnitOfMeasure>(`/unit-of-measures/${id}`),

  create: (data: Partial<UnitOfMeasure>) => apiClient.post<UnitOfMeasure>('/unit-of-measures', data),

  update: (id: string, data: Partial<UnitOfMeasure>) =>
    apiClient.put<UnitOfMeasure>(`/unit-of-measures/${id}`, data),

  delete: (id: string) => apiClient.delete<null>(`/unit-of-measures/${id}`),
};
