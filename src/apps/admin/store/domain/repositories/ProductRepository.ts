import type { Product } from "../entities/Product";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: Omit<Product, "id">): Promise<Product>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>; // Borrado lógico (cambiar estado a inactive)
}