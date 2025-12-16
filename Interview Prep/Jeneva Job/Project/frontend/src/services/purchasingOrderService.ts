import { apiClient } from './api';
import { PurchasingOrder, PurchasingOrderStatus } from '../types';

export const purchasingOrderService = {
  getAll: (status?: PurchasingOrderStatus, supplierId?: string) => {
    let url = '/purchasing-orders';
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (supplierId) params.append('supplierId', supplierId);
    if (params.toString()) url += `?${params.toString()}`;
    return apiClient.get<PurchasingOrder[]>(url);
  },

  getById: (id: string) => apiClient.get<PurchasingOrder>(`/purchasing-orders/${id}`),

  create: (data: Partial<PurchasingOrder>) =>
    apiClient.post<PurchasingOrder>('/purchasing-orders', data),

  update: (id: string, data: Partial<PurchasingOrder>) =>
    apiClient.put<PurchasingOrder>(`/purchasing-orders/${id}`, data),

  updateStatus: (id: string, status: PurchasingOrderStatus) =>
    apiClient.patch<PurchasingOrder>(`/purchasing-orders/${id}/status`, { status }),

  delete: (id: string) => apiClient.delete<null>(`/purchasing-orders/${id}`),
};
