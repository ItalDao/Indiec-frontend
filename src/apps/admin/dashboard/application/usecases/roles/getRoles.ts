import { rolRepository } from '../../../infrastructure/api/rolApi';
import type { Rol } from '../../../domain/models/Rol';

export const getRoles = async (): Promise<Rol[]> => {
  return await rolRepository.getAll();
};