import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';

export const getProductById = (repository: ProductRepository) => {
  return async (id: number): Promise<Product> => {
    return await repository.getById(id);
  };
};
