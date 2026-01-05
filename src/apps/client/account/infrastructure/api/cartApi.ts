import { api } from '../../../../../shared/services/api';
import type { CartItem } from '../../domain/models/CartItem';
import type { CartRepository } from '../../domain/repositories/CartRepository';
import { mockCartItems } from '../mocks/mockCart';

export const cartApi: CartRepository = {
  async getCart() {
    if (import.meta.env.DEV) {
      return [...mockCartItems];
    }
    return api.get<CartItem[]>('/carrito');
  },

  async addItem(item) {
    if (import.meta.env.DEV) {
      const existing = mockCartItems.find(
        i =>
          i.product.id === item.product.id &&
          i.size === item.size &&
          i.color === item.color
      );

      existing ? (existing.quantity += item.quantity) : mockCartItems.push(item);
      return;
    }

    await api.post('/carrito', item);
  },

  async updateItem(item) {
    if (import.meta.env.DEV) {
      const idx = mockCartItems.findIndex(
        i =>
          i.product.id === item.product.id &&
          i.size === item.size &&
          i.color === item.color
      );
      if (idx >= 0) mockCartItems[idx] = item;
      return;
    }

    await api.put('/carrito', item);
  },

  async removeItem(item) {
    if (import.meta.env.DEV) {
      const idx = mockCartItems.findIndex(
        i =>
          i.product.id === item.product.id &&
          i.size === item.size &&
          i.color === item.color
      );
      if (idx >= 0) mockCartItems.splice(idx, 1);
      return;
    }

    await api.delete('/carrito');
  }
};
