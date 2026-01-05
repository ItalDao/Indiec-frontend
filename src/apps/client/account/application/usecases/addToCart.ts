import type { CartRepository } from '../../domain/repositories/CartRepository';
import type { CartItem } from '../../domain/models/CartItem';

export const addToCart = (repository: CartRepository) => {
  return async (item: CartItem) => {
    await repository.addItem(item);
  };
};
