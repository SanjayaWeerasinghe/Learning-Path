import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Materials</h3>
          <p>Manage material master data</p>
          <Link to="/materials" className="btn-primary">
            Go to Materials
          </Link>
        </div>
        <div className="card">
          <h3>Suppliers</h3>
          <p>Manage supplier information</p>
          <Link to="/suppliers" className="btn-primary">
            Go to Suppliers
          </Link>
        </div>
        <div className="card">
          <h3>Purchase Requests</h3>
          <p>Create and manage purchase requests</p>
          <Link to="/purchasing-requests" className="btn-primary">
            Go to Purchase Requests
          </Link>
        </div>
        <div className="card">
          <h3>Purchase Orders</h3>
          <p>Create and track purchase orders</p>
          <Link to="/purchasing-orders" className="btn-primary">
            Go to Purchase Orders
          </Link>
        </div>
        <div className="card">
          <h3>Master Data</h3>
          <p>Manage categories, UOMs, and warehouses</p>
          <Link to="/master-data" className="btn-primary">
            Go to Master Data
          </Link>
        </div>
      </div>
    </div>
  );
};
