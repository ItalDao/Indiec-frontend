import type { RoleRepository } from '../../domain/repositories/RoleRepository';

export const deleteRole = (repository: RoleRepository) => {
  return async (id: string) => {
    await repository.delete(id);
  };
};