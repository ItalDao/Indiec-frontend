import { rolRepository } from '../../../infrastructure/api/rolApi';
import type { UpdateRolDTO, Rol } from '../../../domain/models/Rol';

export const updateRol = async (data: UpdateRolDTO): Promise<Rol> => {
  return await rolRepository.update(data);
};