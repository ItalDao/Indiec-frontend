import type { User } from '../entities/User';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  toggleStatus(id: string): Promise<void>;
}