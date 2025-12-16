import { useState, useEffect } from 'react';
import { purchasingOrderService } from '../services/purchasingOrderService';
import { PurchasingOrder, PurchasingOrderStatus } from '../types';

export function usePurchasingOrders(status?: PurchasingOrderStatus, supplierId?: string) {
  const [orders, setOrders] = useState<PurchasingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await purchasingOrderService.getAll(status, supplierId);
      setOrders(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch purchasing orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, supplierId]);

  const createOrder = async (data: Partial<PurchasingOrder>) => {
    const newOrder = await purchasingOrderService.create(data);
    setOrders([...orders, newOrder]);
    return newOrder;
  };

  const updateOrder = async (id: string, data: Partial<PurchasingOrder>) => {
    const updated = await purchasingOrderService.update(id, data);
    setOrders(orders.map((o) => (o.id === id ? updated : o)));
    return updated;
  };

  const updateOrderStatus = async (id: string, status: PurchasingOrderStatus) => {
    const updated = await purchasingOrderService.updateStatus(id, status);
    setOrders(orders.map((o) => (o.id === id ? updated : o)));
    return updated;
  };

  const deleteOrder = async (id: string) => {
    await purchasingOrderService.delete(id);
    setOrders(orders.filter((o) => o.id !== id));
  };

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
  };
}
