import { usuarioRepository } from '../../../infrastructure/api/usuarioApi';
import type { CreateUsuarioDTO, UsuarioAdmin } from '../../../domain/models/UsuarioAdmin';

export const createUsuario = async (data: CreateUsuarioDTO): Promise<UsuarioAdmin> => {
  return await usuarioRepository.create(data);
};