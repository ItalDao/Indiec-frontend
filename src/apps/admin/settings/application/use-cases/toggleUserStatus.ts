import type { UserRepository } from '../../domain/repositories/UserRepository';

export const toggleUserStatus = (repository: UserRepository) => {
  return async (id: string) => {
    await repository.toggleStatus(id);
  };
};