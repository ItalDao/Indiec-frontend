import { PaginaEstatica } from "../entities/PaginaEstatica";


export interface PaginaEstaticaRepository {
  getAll(): Promise<PaginaEstatica[]>;
  getById(id: string): Promise<PaginaEstatica | null>;
  create(page: PaginaEstatica): Promise<void>;
  update(page: PaginaEstatica): Promise<void>;
  delete(id: string): Promise<void>; // eliminación lógica después
}
