import { rolRepository } from '../../../infrastructure/api/rolApi';
import type { Rol } from '../../../domain/models/Rol';

export const toggleRolEstado = async (id: string): Promise<Rol> => {
  return await rolRepository.toggleEstado(id);
};