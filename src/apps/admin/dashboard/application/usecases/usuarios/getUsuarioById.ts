import { usuarioRepository } from '../../../infrastructure/api/usuarioApi';
import type { UsuarioAdmin } from '../../../domain/models/UsuarioAdmin';

export const getUsuarioById = async (id: string): Promise<UsuarioAdmin | null> => {
  return await usuarioRepository.getById(id);
};