import type { Product } from '../../domain/models/Product';
import type { ProductRepository } from '../../domain/repositories/ProductRepository';

export const getProducts = (repository: ProductRepository) => {
  return async (): Promise<Product[]> => {
    return await repository.getAll();
  };
};
