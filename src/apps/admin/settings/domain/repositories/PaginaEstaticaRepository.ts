import type { PaginaEstatica } from "../entities/PaginaEstatica";

export interface PaginaEstaticaRepository {
  getAll(): Promise<PaginaEstatica[]>;
  getById(id: string): Promise<PaginaEstatica | null>;
  create(page: Omit<PaginaEstatica, 'id'>): Promise<PaginaEstatica>;
  update(page: PaginaEstatica): Promise<void>;
  delete(id: string): Promise<void>;
  toggleVisibility(id: string): Promise<void>;
}