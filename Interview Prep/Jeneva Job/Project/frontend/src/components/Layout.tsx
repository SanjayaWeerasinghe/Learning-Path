import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useApp();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>ERP Procurement System</h1>
        </div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/materials">Materials</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/purchasing-requests">Purchase Requests</Link>
          <Link to="/purchasing-orders">Purchase Orders</Link>
          <Link to="/master-data">Master Data</Link>
        </div>
        <div className="nav-user">
          <span>User: {user}</span>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};
