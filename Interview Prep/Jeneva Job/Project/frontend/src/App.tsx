import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MaterialsPage } from './pages/MaterialsPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { PurchasingRequestsPage } from './pages/PurchasingRequestsPage';
import { PurchasingOrdersPage } from './pages/PurchasingOrdersPage';
import { MasterDataPage } from './pages/MasterDataPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/purchasing-requests" element={<PurchasingRequestsPage />} />
            <Route path="/purchasing-orders" element={<PurchasingOrdersPage />} />
            <Route path="/master-data" element={<MasterDataPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
