import type { PaginaEstaticaRepository } from '../../domain/repositories/PaginaEstaticaRepository';
import type { PaginaEstatica } from '../../domain/entities/PaginaEstatica';

export const createStaticPage = (repository: PaginaEstaticaRepository) => {
  return async (page: Omit<PaginaEstatica, 'id'>) => {
    return await repository.create(page);
  };
};