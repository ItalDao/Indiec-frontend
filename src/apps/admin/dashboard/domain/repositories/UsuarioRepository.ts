import type { UsuarioAdmin, CreateUsuarioDTO, UpdateUsuarioDTO } from '../models/UsuarioAdmin';

export interface UsuarioRepository {
  getAll(): Promise<UsuarioAdmin[]>;
  getById(id: string): Promise<UsuarioAdmin | null>;
  create(data: CreateUsuarioDTO): Promise<UsuarioAdmin>;
  update(data: UpdateUsuarioDTO): Promise<UsuarioAdmin>;
  delete(id: string): Promise<void>;
  resetPassword(id: string, newPassword: string): Promise<void>;
}