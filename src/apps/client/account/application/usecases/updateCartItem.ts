import type { CartRepository } from '../../domain/repositories/CartRepository';
import type { CartItem } from '../../domain/models/CartItem';

export const updateCartItem = (repository: CartRepository) => {
  return async (item: CartItem) => {
    await repository.updateItem(item);
  };
};
