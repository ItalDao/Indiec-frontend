import { api } from '../../../../../shared/services/api';
import type { UsuarioAdmin, CreateUsuarioDTO, UpdateUsuarioDTO } from '../../domain/models/UsuarioAdmin';
import type { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';

class UsuarioApiRepository implements UsuarioRepository {
  private readonly basePath = '/admin/usuarios';

  async getAll(): Promise<UsuarioAdmin[]> {
    return api.get<UsuarioAdmin[]>(this.basePath);
  }

  async getById(id: string): Promise<UsuarioAdmin | null> {
    try {
      return await api.get<UsuarioAdmin>(`${this.basePath}/${id}`);
    } catch (error) {
      console.error('Error fetching usuario:', error);
      return null;
    }
  }

  async create(data: CreateUsuarioDTO): Promise<UsuarioAdmin> {
    return api.post<UsuarioAdmin>(this.basePath, data);
  }

  async update(data: UpdateUsuarioDTO): Promise<UsuarioAdmin> {
    const { id, ...updateData } = data;
    return api.put<UsuarioAdmin>(`${this.basePath}/${id}`, updateData);
  }

  async delete(id: string): Promise<void> {
    await api.delete(`${this.basePath}/${id}`);
  }

  async resetPassword(id: string, newPassword: string): Promise<void> {
    await api.patch(`${this.basePath}/${id}/reset-password`, { password: newPassword });
  }
}

export const usuarioRepository = new UsuarioApiRepository();