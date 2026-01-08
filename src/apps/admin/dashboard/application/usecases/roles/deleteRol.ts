import { rolRepository } from '../../../infrastructure/api/rolApi';

export const deleteRol = async (id: string): Promise<void> => {
  await rolRepository.delete(id);
};