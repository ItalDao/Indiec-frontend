import { api } from '../../../../../shared/services/api';
import type { Rol, CreateRolDTO, UpdateRolDTO } from '../../domain/models/Rol';
import type { RolRepository } from '../../domain/repositories/RolRepository';

class RolApiRepository implements RolRepository {
  private readonly basePath = '/admin/roles';

  async getAll(): Promise<Rol[]> {
    return api.get<Rol[]>(this.basePath);
  }

  async getById(id: string): Promise<Rol | null> {
    try {
      return await api.get<Rol>(`${this.basePath}/${id}`);
    } catch (error) {
      console.error('Error fetching rol:', error);
      return null;
    }
  }

  async create(data: CreateRolDTO): Promise<Rol> {
    return api.post<Rol>(this.basePath, data);
  }

  async update(data: UpdateRolDTO): Promise<Rol> {
    const { id, ...updateData } = data;
    return api.put<Rol>(`${this.basePath}/${id}`, updateData);
  }

  async delete(id: string): Promise<void> {
    await api.delete(`${this.basePath}/${id}`);
  }

  async toggleEstado(id: string): Promise<Rol> {
    return api.patch<Rol>(`${this.basePath}/${id}/toggle-estado`, {});
  }
}

export const rolRepository = new RolApiRepository();