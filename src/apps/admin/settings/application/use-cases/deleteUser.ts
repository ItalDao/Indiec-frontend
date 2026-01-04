import type { UserRepository } from '../../domain/repositories/UserRepository';

export const deleteUser = (repository: UserRepository) => {
  return async (id: string) => {
    await repository.delete(id);
  };
};