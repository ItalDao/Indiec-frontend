import type { Rol, CreateRolDTO, UpdateRolDTO } from '../models/Rol';

export interface RolRepository {
  getAll(): Promise<Rol[]>;
  getById(id: string): Promise<Rol | null>;
  create(data: CreateRolDTO): Promise<Rol>;
  update(data: UpdateRolDTO): Promise<Rol>;
  delete(id: string): Promise<void>;
  toggleEstado(id: string): Promise<Rol>;
}