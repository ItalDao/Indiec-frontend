import type { PaginaEstaticaRepository } from '../../domain/repositories/PaginaEstaticaRepository';

export const getAllStaticPages = (repository: PaginaEstaticaRepository) => {
  return async () => {
    return await repository.getAll();
  };
};