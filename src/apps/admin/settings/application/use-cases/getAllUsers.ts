import type { UserRepository } from '../../domain/repositories/UserRepository';

export const getAllUsers = (repository: UserRepository) => {
  return async () => {
    return await repository.getAll();
  };
};