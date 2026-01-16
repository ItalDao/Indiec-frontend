import type { PaginaEstaticaRepository } from '../../domain/repositories/PaginaEstaticaRepository';
import type { PaginaEstatica } from '../../domain/entities/PaginaEstatica';

export const updateStaticPage = (repository: PaginaEstaticaRepository) => {
  return async (page: PaginaEstatica) => {
    await repository.update(page);
  };
};