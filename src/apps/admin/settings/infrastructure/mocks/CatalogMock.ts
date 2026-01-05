import type { CatalogRepository } from '../../domain/repositories/CatalogRepository';
import type { CatalogItem, CatalogType } from '../../domain/entities/Catalog';

const mockGenres: CatalogItem[] = [
  { id: "1", name: "Rock", code: "ROCK" },
  { id: "2", name: "Pop", code: "POP" },
  { id: "3", name: "Jazz", code: "JAZZ" },
];

const mockCountries: CatalogItem[] = [
  { id: "1", name: "Ecuador", code: "EC" },
  { id: "2", name: "Colombia", code: "CO" },
  { id: "3", name: "Perú", code: "PE" },
];

const mockCategories: CatalogItem[] = [
  { id: "1", name: "Camisetas" },
  { id: "2", name: "Accesorios" },
  { id: "3", name: "Vinilos" },
];

const mockSizes: CatalogItem[] = [
  { id: "1", name: "S", code: "S" },
  { id: "2", name: "M", code: "M" },
  { id: "3", name: "L", code: "L" },
  { id: "4", name: "XL", code: "XL" },
];

export class CatalogMock implements CatalogRepository {
  private catalogs: Record<CatalogType, CatalogItem[]> = {
    genres: [...mockGenres],
    countries: [...mockCountries],
    categories: [...mockCategories],
    sizes: [...mockSizes],
  };

  async getAll(type: CatalogType): Promise<CatalogItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.catalogs[type]]);
      }, 300);
    });
  }

  async getById(type: CatalogType, id: string): Promise<CatalogItem | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = this.catalogs[type].find(i => i.id === id) || null;
        resolve(item ? { ...item } : null);
      }, 200);
    });
  }

  async create(type: CatalogType, item: Omit<CatalogItem, 'id'>): Promise<CatalogItem> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem: CatalogItem = {
          ...item,
          id: Date.now().toString(),
        };
        this.catalogs[type].push(newItem);
        console.log(`Item ${type} creado (mock):`, newItem);
        resolve(newItem);
      }, 500);
    });
  }

  async update(type: CatalogType, item: CatalogItem): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.catalogs[type].findIndex(i => i.id === item.id);
        if (index !== -1) {
          this.catalogs[type][index] = { ...item };
          console.log(`Item ${type} actualizado (mock):`, item);
        }
        resolve();
      }, 500);
    });
  }

  async delete(type: CatalogType, id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.catalogs[type] = this.catalogs[type].filter(i => i.id !== id);
        console.log(`Item ${type} eliminado (mock):`, id);
        resolve();
      }, 400);
    });
  }
}