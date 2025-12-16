import React from 'react';
import { PurchasingRequest } from '../types';

interface PurchasingRequestListProps {
  requests: PurchasingRequest[];
  onView: (request: PurchasingRequest) => void;
}

export const PurchasingRequestList: React.FC<PurchasingRequestListProps> = ({
  requests,
  onView,
}) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Request Number</th>
            <th>Request Date</th>
            <th>Requested By</th>
            <th>Department</th>
            <th>Status</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.requestNumber}</td>
              <td>{new Date(request.requestDate).toLocaleDateString()}</td>
              <td>{request.requestedBy}</td>
              <td>{request.department || 'N/A'}</td>
              <td>
                <span className={`status-badge status-${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </td>
              <td>{request.items?.length || 0}</td>
              <td>
                <button className="btn-view" onClick={() => onView(request)}>
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
