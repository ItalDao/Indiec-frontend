import type { CartItem } from './CartItem';

export interface Order {
  id: number;
  items: CartItem[];
  shippingMethod?: 'standard' | 'express';
  shippingCost?: number;
  total: number;
  status: 'pendiente' | 'pagado' | 'enviado';
  createdAt: string;
}
