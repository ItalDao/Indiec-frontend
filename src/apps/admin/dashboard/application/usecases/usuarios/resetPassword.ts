import { usuarioRepository } from '../../../infrastructure/api/usuarioApi';

export const resetPassword = async (id: string, newPassword: string = '123456'): Promise<void> => {
  await usuarioRepository.resetPassword(id, newPassword);
};