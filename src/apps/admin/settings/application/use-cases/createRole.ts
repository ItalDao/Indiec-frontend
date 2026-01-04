import type { RoleRepository } from '../../domain/repositories/RoleRepository';
import type { Role } from '../../domain/entities/Role';

export const createRole = (repository: RoleRepository) => {
  return async (role: Omit<Role, 'id'>) => {
    return await repository.create(role);
  };
};