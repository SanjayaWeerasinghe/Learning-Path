import { useState, useEffect } from 'react';
import { purchasingRequestService } from '../services/purchasingRequestService';
import { PurchasingRequest, PurchasingRequestStatus } from '../types';

export function usePurchasingRequests(status?: PurchasingRequestStatus) {
  const [requests, setRequests] = useState<PurchasingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await purchasingRequestService.getAll(status);
      setRequests(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch purchasing requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [status]);

  const createRequest = async (data: Partial<PurchasingRequest>) => {
    const newRequest = await purchasingRequestService.create(data);
    setRequests([...requests, newRequest]);
    return newRequest;
  };

  const updateRequest = async (id: string, data: Partial<PurchasingRequest>) => {
    const updated = await purchasingRequestService.update(id, data);
    setRequests(requests.map((r) => (r.id === id ? updated : r)));
    return updated;
  };

  const updateRequestStatus = async (
    id: string,
    status: PurchasingRequestStatus,
    approvedBy?: string
  ) => {
    const updated = await purchasingRequestService.updateStatus(id, status, approvedBy);
    setRequests(requests.map((r) => (r.id === id ? updated : r)));
    return updated;
  };

  const deleteRequest = async (id: string) => {
    await purchasingRequestService.delete(id);
    setRequests(requests.filter((r) => r.id !== id));
  };

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    createRequest,
    updateRequest,
    updateRequestStatus,
    deleteRequest,
  };
}
