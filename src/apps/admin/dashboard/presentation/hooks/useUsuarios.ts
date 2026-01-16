import { useState, useEffect } from 'react';
import { getUsuarios } from '../../application/usecases/usuarios/getUsuarios';
import { createUsuario } from '../../application/usecases/usuarios/createUsuario';
import { updateUsuario } from '../../application/usecases/usuarios/updateUsuario';
import { deleteUsuario } from '../../application/usecases/usuarios/deleteUsuario';
import { resetPassword } from '../../application/usecases/usuarios/resetPassword';
import type { UsuarioAdmin, CreateUsuarioDTO, UpdateUsuarioDTO } from '../../domain/models/UsuarioAdmin';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const addUsuario = async (data: CreateUsuarioDTO) => {
    try {
      const newUsuario = await createUsuario(data);
      setUsuarios(prev => [...prev, newUsuario]);
      return newUsuario;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear usuario');
      throw err;
    }
  };

  const editUsuario = async (data: UpdateUsuarioDTO) => {
    try {
      const updatedUsuario = await updateUsuario(data);
      setUsuarios(prev => prev.map(u => u.id === data.id ? updatedUsuario : u));
      return updatedUsuario;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar usuario');
      throw err;
    }
  };

  const removeUsuario = async (id: string) => {
    try {
      await deleteUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar usuario');
      throw err;
    }
  };

  const resetUserPassword = async (id: string) => {
    try {
      await resetPassword(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al resetear contraseña');
      throw err;
    }
  };

  return {
    usuarios,
    loading,
    error,
    addUsuario,
    editUsuario,
    removeUsuario,
    resetUserPassword,
    refetch: fetchUsuarios,
  };
};