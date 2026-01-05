import type { CatalogRepository } from '../../domain/repositories/CatalogRepository';
import type { CatalogItem, CatalogType } from '../../domain/entities/Catalog';

export const createCatalogItem = (repository: CatalogRepository) => {
  return async (type: CatalogType, item: Omit<CatalogItem, 'id'>) => {
    return await repository.create(type, item);
  };
};