// createProduct.usecase.ts
import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export class CreateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(product: Product): Promise<void> {
    // Validaciones de negocio obligatorias (adaptado de songs)
    if (!product.name || !product.category || !product.price || product.price <= 0) {
      throw new Error("Faltan campos obligatorios o precio inválido");
    }
    await this.productRepository.create(product);
  }
}