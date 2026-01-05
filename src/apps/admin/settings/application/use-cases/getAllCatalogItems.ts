import type { CatalogRepository } from '../../domain/repositories/CatalogRepository';
import type { CatalogType } from '../../domain/entities/Catalog';

export const getAllCatalogItems = (repository: CatalogRepository) => {
  return async (type: CatalogType) => {
    return await repository.getAll(type);
  };
};