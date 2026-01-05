import type { PaginaEstaticaRepository } from '../../domain/repositories/PaginaEstaticaRepository';

export const toggleStaticPageVisibility = (repository: PaginaEstaticaRepository) => {
  return async (id: string) => {
    await repository.toggleVisibility(id);
  };
};