import { PaginaEstatica } from "../../domain/entities/PaginaEstatica";
import { PaginaEstaticaRepository } from "../../domain/repositories/PaginaEstaticaRepository";

export class GetAllStaticPages {
  constructor(
    private readonly repository: PaginaEstaticaRepository
  ) {}

  execute(): Promise<PaginaEstatica[]> {
    return this.repository.getAll();
  }
}
