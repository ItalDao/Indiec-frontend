// updateProduct.usecase.ts
import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export class UpdateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string, productData: Partial<Product>): Promise<void> {
    if (!id) throw new Error("Se requiere el ID para actualizar");
    await this.productRepository.update({ id, ...productData } as Product);
  }
}