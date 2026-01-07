import { rolRepository } from '../../../infrastructure/api/rolApi';
import type { Rol } from '../../../domain/models/Rol';

export const getRolById = async (id: string): Promise<Rol | null> => {
  return await rolRepository.getById(id);
};