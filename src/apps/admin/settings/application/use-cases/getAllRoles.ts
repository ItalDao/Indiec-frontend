import type { RoleRepository } from '../../domain/repositories/RoleRepository';

export const getAllRoles = (repository: RoleRepository) => {
  return async () => {
    return await repository.getAll();
  };
};