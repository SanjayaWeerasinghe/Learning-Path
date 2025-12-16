import React from 'react';
import { PurchasingOrder } from '../types';

interface PurchasingOrderListProps {
  orders: PurchasingOrder[];
  onView: (order: PurchasingOrder) => void;
}

export const PurchasingOrderList: React.FC<PurchasingOrderListProps> = ({ orders, onView }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.supplier?.name}</td>
              <td>
                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>${order.totalAmount?.toFixed(2)}</td>
              <td>{order.items?.length || 0}</td>
              <td>
                <button className="btn-view" onClick={() => onView(order)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
