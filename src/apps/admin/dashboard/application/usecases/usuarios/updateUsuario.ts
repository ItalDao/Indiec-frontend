import { usuarioRepository } from '../../../infrastructure/api/usuarioApi';
import type { UpdateUsuarioDTO, UsuarioAdmin } from '../../../domain/models/UsuarioAdmin';

export const updateUsuario = async (data: UpdateUsuarioDTO): Promise<UsuarioAdmin> => {
  return await usuarioRepository.update(data);
};