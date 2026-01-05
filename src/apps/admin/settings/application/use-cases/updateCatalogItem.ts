import type { CatalogRepository } from '../../domain/repositories/CatalogRepository';
import type { CatalogItem, CatalogType } from '../../domain/entities/Catalog';

export const updateCatalogItem = (repository: CatalogRepository) => {
  return async (type: CatalogType, item: CatalogItem) => {
    await repository.update(type, item);
  };
};