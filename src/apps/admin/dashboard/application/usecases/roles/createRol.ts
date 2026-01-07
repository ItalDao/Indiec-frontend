import { rolRepository } from '../../../infrastructure/api/rolApi';
import type { CreateRolDTO, Rol } from '../../../domain/models/Rol';

export const createRol = async (data: CreateRolDTO): Promise<Rol> => {
  return await rolRepository.create(data);
};