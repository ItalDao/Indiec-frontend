import { api } from '../../../../../shared/services/api';
import type { Product } from '../../domain/models/Product';
import type { ProductRepository } from '../../domain/repositories/ProductRepository';

export const productApi: ProductRepository = {
  async getAll() {
    return await api.get<Product[]>('/ropa');
  },

  async getById(id: number) {
    return await api.get<Product>(`/ropa/${id}`);
  },
};
