import type { Role } from '../entities/Role';

export interface RoleRepository {
  getAll(): Promise<Role[]>;
  getById(id: string): Promise<Role | null>;
  create(role: Omit<Role, 'id'>): Promise<Role>;
  update(role: Role): Promise<void>;
  delete(id: string): Promise<void>;
}