import React from 'react';
import { useApi } from '../hooks/useApi';
import { supplierService } from '../services/supplierService';
import { Supplier } from '../types';

export const SuppliersPage: React.FC = () => {
  const { data: suppliers, loading, error } = useApi<Supplier[]>(
    () => supplierService.getAll(),
    []
  );

  if (loading) return <div className="loading">Loading suppliers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Suppliers</h2>
        <button className="btn-primary">Add New Supplier</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.code}</td>
                <td>{supplier.name}</td>
                <td>{supplier.contactPerson || 'N/A'}</td>
                <td>{supplier.email || 'N/A'}</td>
                <td>{supplier.phone || 'N/A'}</td>
                <td>{supplier.city || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${supplier.isActive ? 'active' : 'inactive'}`}>
                    {supplier.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button className="btn-edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
