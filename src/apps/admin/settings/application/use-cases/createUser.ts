import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';

export const createUser = (repository: UserRepository) => {
  return async (user: Omit<User, 'id'>) => {
    return await repository.create(user);
  };
};