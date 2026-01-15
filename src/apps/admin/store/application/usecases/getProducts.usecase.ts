// getProducts.usecase.ts
import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export class GetProductsUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }
}