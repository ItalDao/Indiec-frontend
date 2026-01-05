import type { CartItem } from '../models/CartItem';

export interface CartRepository {
  getCart(): Promise<CartItem[]>;
  addItem(item: CartItem): Promise<void>;
  updateItem(item: CartItem): Promise<void>;
  removeItem(item: CartItem): Promise<void>;
}
