import React, { useState } from 'react';
import { useMaterials } from '../hooks/useMaterials';
import { MaterialList } from '../components/MaterialList';
import { Material } from '../types';

export const MaterialsPage: React.FC = () => {
  const { materials, loading, error, deleteMaterial } = useMaterials();
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const handleEdit = (material: Material) => {
    setSelectedMaterial(material);
    // In a real app, this would open a modal or navigate to an edit page
    console.log('Edit material:', material);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await deleteMaterial(id);
        alert('Material deleted successfully');
      } catch (err) {
        alert('Failed to delete material');
      }
    }
  };

  if (loading) return <div className="loading">Loading materials...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Materials</h2>
        <button className="btn-primary">Add New Material</button>
      </div>
      <MaterialList materials={materials} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
