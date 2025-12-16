import React from 'react';
import { Material } from '../types';

interface MaterialListProps {
  materials: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: string) => void;
}

export const MaterialList: React.FC<MaterialListProps> = ({ materials, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>UOM</th>
            <th>Stock Qty</th>
            <th>Standard Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id}>
              <td>{material.code}</td>
              <td>{material.name}</td>
              <td>{material.category?.name}</td>
              <td>{material.unitOfMeasure?.code}</td>
              <td>{material.stockQuantity}</td>
              <td>${material.standardCost?.toFixed(2) || 'N/A'}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(material)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(material.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
