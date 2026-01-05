import { useState, useEffect } from 'react';
import type { Role } from '../../domain/entities/Role';
import { getAllRoles } from '../../application/use-cases/getAllRoles';
import { createRole } from '../../application/use-cases/createRole';
import { updateRole } from '../../application/use-cases/updateRole';
import { deleteRole } from '../../application/use-cases/deleteRole';
import { RoleMock } from '../../infrastructure/mocks/RoleMock';

const repository = new RoleMock();

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const getAll = getAllRoles(repository);
      const data = await getAll();
      setRoles(data);
    } catch (err) {
      setError('Error al cargar roles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createNewRole = async (role: Omit<Role, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const create = createRole(repository);
      const newRole = await create(role);
      setRoles([...roles, newRole]);
      return true;
    } catch (err) {
      setError('Error al crear rol');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingRole = async (role: Role) => {
    try {
      setLoading(true);
      setError(null);
      const update = updateRole(repository);
      await update(role);
      setRoles(roles.map(r => r.id === role.id ? role : r));
      return true;
    } catch (err) {
      setError('Error al actualizar rol');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingRole = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const deleteUseCase = deleteRole(repository);
      await deleteUseCase(id);
      setRoles(roles.filter(r => r.id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar rol');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    createRole: createNewRole,
    updateRole: updateExistingRole,
    deleteRole: deleteExistingRole,
    reloadRoles: loadRoles,
  };
};