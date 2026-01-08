import { usuarioRepository } from '../../../infrastructure/api/usuarioApi';

export const deleteUsuario = async (id: string): Promise<void> => {
  await usuarioRepository.delete(id);
};