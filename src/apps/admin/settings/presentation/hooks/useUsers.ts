import { useState, useEffect } from 'react';
import type { User } from '../../domain/entities/User';
import { getAllUsers } from '../../application/use-cases/getAllUsers';
import { createUser } from '../../application/use-cases/createUser';
import { updateUser } from '../../application/use-cases/updateUser';
import { deleteUser } from '../../application/use-cases/deleteUser';
import { toggleUserStatus } from '../../application/use-cases/toggleUserStatus';
import { UserMock } from '../../infrastructure/mocks/UserMock';

const repository = new UserMock();

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const getAll = getAllUsers(repository);
      const data = await getAll();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createNewUser = async (user: Omit<User, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const create = createUser(repository);
      const newUser = await create(user);
      setUsers([...users, newUser]);
      return true;
    } catch (err) {
      setError('Error al crear usuario');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingUser = async (user: User) => {
    try {
      setLoading(true);
      setError(null);
      const update = updateUser(repository);
      await update(user);
      setUsers(users.map(u => u.id === user.id ? user : u));
      return true;
    } catch (err) {
      setError('Error al actualizar usuario');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const deleteUseCase = deleteUser(repository);
      await deleteUseCase(id);
      setUsers(users.filter(u => u.id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar usuario');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      const toggle = toggleUserStatus(repository);
      await toggle(id);
      setUsers(users.map(u => 
        u.id === id 
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      ));
      return true;
    } catch (err) {
      setError('Error al cambiar estado');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    createUser: createNewUser,
    updateUser: updateExistingUser,
    deleteUser: deleteExistingUser,
    toggleStatus,
    reloadUsers: loadUsers,
  };
};