import type { CatalogItem, CatalogType } from '../entities/Catalog';

export interface CatalogRepository {
  getAll(type: CatalogType): Promise<CatalogItem[]>;
  getById(type: CatalogType, id: string): Promise<CatalogItem | null>;
  create(type: CatalogType, item: Omit<CatalogItem, 'id'>): Promise<CatalogItem>;
  update(type: CatalogType, item: CatalogItem): Promise<void>;
  delete(type: CatalogType, id: string): Promise<void>;
}