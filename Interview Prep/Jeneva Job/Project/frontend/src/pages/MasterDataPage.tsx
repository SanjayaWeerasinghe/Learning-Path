import React from 'react';

export const MasterDataPage: React.FC = () => {
  return (
    <div className="page">
      <h2>Master Data</h2>
      <div className="master-data-grid">
        <div className="card">
          <h3>Categories</h3>
          <p>Manage material categories</p>
          <button className="btn-primary">Manage Categories</button>
        </div>
        <div className="card">
          <h3>Units of Measure</h3>
          <p>Manage units of measure</p>
          <button className="btn-primary">Manage UOMs</button>
        </div>
        <div className="card">
          <h3>Warehouses</h3>
          <p>Manage warehouse locations</p>
          <button className="btn-primary">Manage Warehouses</button>
        </div>
      </div>
    </div>
  );
};
