import type { RoleRepository } from '../../domain/repositories/RoleRepository';
import type { Role } from '../../domain/entities/Role';

export const updateRole = (repository: RoleRepository) => {
  return async (role: Role) => {
    await repository.update(role);
  };
};