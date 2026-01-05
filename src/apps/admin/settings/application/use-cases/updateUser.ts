import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';

export const updateUser = (repository: UserRepository) => {
  return async (user: User) => {
    await repository.update(user);
  };
};