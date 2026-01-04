export interface CatalogItem {
  id: string;
  name: string;
  code?: string;
}

export type CatalogType = 'genres' | 'countries' | 'categories' | 'sizes';