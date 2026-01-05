import type { CartRepository } from '../../domain/repositories/CartRepository';
import type { CartItem } from '../../domain/models/CartItem';

export const removeCartItem =
  (repo: CartRepository) =>
  async (item: CartItem) => {
    await repo.removeItem(item);
  };
