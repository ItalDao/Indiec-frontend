import type { PaginaEstaticaRepository } from '../../domain/repositories/PaginaEstaticaRepository';

export const deleteStaticPage = (repository: PaginaEstaticaRepository) => {
  return async (id: string) => {
    await repository.delete(id);
  };
};