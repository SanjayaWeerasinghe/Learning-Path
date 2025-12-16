import React, { useState } from 'react';
import { usePurchasingOrders } from '../hooks/usePurchasingOrders';
import { PurchasingOrderList } from '../components/PurchasingOrderList';
import { PurchasingOrder } from '../types';

export const PurchasingOrdersPage: React.FC = () => {
  const { orders, loading, error } = usePurchasingOrders();
  const [selectedOrder, setSelectedOrder] = useState<PurchasingOrder | null>(null);

  const handleView = (order: PurchasingOrder) => {
    setSelectedOrder(order);
    // In a real app, this would navigate to a detail page
    console.log('View order:', order);
  };

  if (loading) return <div className="loading">Loading purchase orders...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Purchase Orders</h2>
        <button className="btn-primary">Create New Order</button>
      </div>
      <PurchasingOrderList orders={orders} onView={handleView} />
    </div>
  );
};
