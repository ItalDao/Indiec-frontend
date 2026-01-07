import { useState, useEffect } from 'react';
import { getRoles } from '../../application/usecases/roles/getRoles';
import { createRol } from '../../application/usecases/roles/createRol';
import { updateRol } from '../../application/usecases/roles/updateRol';
import { deleteRol } from '../../application/usecases/roles/deleteRol';
import { toggleRolEstado } from '../../application/usecases/roles/toggleRolEstado';
import type { Rol, CreateRolDTO, UpdateRolDTO } from '../../domain/models/Rol';

export const useRoles = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRoles();
      setRoles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRol = async (data: CreateRolDTO) => {
    try {
      const newRol = await createRol(data);
      setRoles(prev => [...prev, newRol]);
      return newRol;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear rol');
      throw err;
    }
  };

  const editRol = async (data: UpdateRolDTO) => {
    try {
      const updatedRol = await updateRol(data);
      setRoles(prev => prev.map(r => r.id === data.id ? updatedRol : r));
      return updatedRol;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar rol');
      throw err;
    }
  };

  const removeRol = async (id: string) => {
    try {
      await deleteRol(id);
      setRoles(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar rol');
      throw err;
    }
  };

  const toggleEstado = async (id: string) => {
    try {
      const updatedRol = await toggleRolEstado(id);
      setRoles(prev => prev.map(r => r.id === id ? updatedRol : r));
      return updatedRol;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado');
      throw err;
    }
  };

  return {
    roles,
    loading,
    error,
    addRol,
    editRol,
    removeRol,
    toggleEstado,
    refetch: fetchRoles,
  };
};