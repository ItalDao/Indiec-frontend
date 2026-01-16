// deleteProduct.usecase.ts
import type { ProductRepository } from '../../domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<void> {
    if (!id) throw new Error("ID requerido para eliminar");
    await this.productRepository.delete(id);
  }
}