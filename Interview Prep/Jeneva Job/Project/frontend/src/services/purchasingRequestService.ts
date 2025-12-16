import { apiClient } from './api';
import { PurchasingRequest, PurchasingRequestStatus } from '../types';

export const purchasingRequestService = {
  getAll: (status?: PurchasingRequestStatus) => {
    const url = status ? `/purchasing-requests?status=${status}` : '/purchasing-requests';
    return apiClient.get<PurchasingRequest[]>(url);
  },

  getById: (id: string) => apiClient.get<PurchasingRequest>(`/purchasing-requests/${id}`),

  create: (data: Partial<PurchasingRequest>) =>
    apiClient.post<PurchasingRequest>('/purchasing-requests', data),

  update: (id: string, data: Partial<PurchasingRequest>) =>
    apiClient.put<PurchasingRequest>(`/purchasing-requests/${id}`, data),

  updateStatus: (id: string, status: PurchasingRequestStatus, approvedBy?: string) =>
    apiClient.patch<PurchasingRequest>(`/purchasing-requests/${id}/status`, { status, approvedBy }),

  delete: (id: string) => apiClient.delete<null>(`/purchasing-requests/${id}`),
};
