import { useState, useEffect } from 'react';
import { materialService } from '../services/materialService';
import { Material } from '../types';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await materialService.getAll();
      setMaterials(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const createMaterial = async (data: Partial<Material>) => {
    const newMaterial = await materialService.create(data);
    setMaterials([...materials, newMaterial]);
    return newMaterial;
  };

  const updateMaterial = async (id: string, data: Partial<Material>) => {
    const updated = await materialService.update(id, data);
    setMaterials(materials.map((m) => (m.id === id ? updated : m)));
    return updated;
  };

  const deleteMaterial = async (id: string) => {
    await materialService.delete(id);
    setMaterials(materials.filter((m) => m.id !== id));
  };

  return {
    materials,
    loading,
    error,
    refetch: fetchMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
}
