import { usuarioRepository } from '../../../infrastructure/api/usuarioApi';
import type { UsuarioAdmin } from '../../../domain/models/UsuarioAdmin';

export const getUsuarios = async (): Promise<UsuarioAdmin[]> => {
  return await usuarioRepository.getAll();
};