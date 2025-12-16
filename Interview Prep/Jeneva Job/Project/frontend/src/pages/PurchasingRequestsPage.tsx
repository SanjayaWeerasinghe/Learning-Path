import React, { useState } from 'react';
import { usePurchasingRequests } from '../hooks/usePurchasingRequests';
import { PurchasingRequestList } from '../components/PurchasingRequestList';
import { PurchasingRequest } from '../types';

export const PurchasingRequestsPage: React.FC = () => {
  const { requests, loading, error } = usePurchasingRequests();
  const [selectedRequest, setSelectedRequest] = useState<PurchasingRequest | null>(null);

  const handleView = (request: PurchasingRequest) => {
    setSelectedRequest(request);
    // In a real app, this would navigate to a detail page
    console.log('View request:', request);
  };

  if (loading) return <div className="loading">Loading purchase requests...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Purchase Requests</h2>
        <button className="btn-primary">Create New Request</button>
      </div>
      <PurchasingRequestList requests={requests} onView={handleView} />
    </div>
  );
};
