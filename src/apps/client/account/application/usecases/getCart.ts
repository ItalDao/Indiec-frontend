import type { CartRepository } from '../../domain/repositories/CartRepository';
import type { CartItem } from '../../domain/models/CartItem';

export const getCart = (repository: CartRepository) => {
  return async (): Promise<CartItem[]> => {
    return await repository.getCart();
  };
};
