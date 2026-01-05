import type { CatalogRepository } from '../../domain/repositories/CatalogRepository';
import type { CatalogType } from '../../domain/entities/Catalog';

export const deleteCatalogItem = (repository: CatalogRepository) => {
  return async (type: CatalogType, id: string) => {
    await repository.delete(type, id);
  };
};