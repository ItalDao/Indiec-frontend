// src/apps/client/account/infrastructure/mocks/mockOrders.ts

import type { Order } from '../../domain/models/Order';
import { mockCartItems } from './mockCart';

// 🔹 Órdenes de ejemplo
export const mockOrders: Order[] = [
  {
    id: 1,
    items: [...mockCartItems],
    total: mockCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
    status: 'pendiente',
    createdAt: new Date().toISOString(),
  },
];

// 🔹 Obtener órdenes mock
export const getMockOrders = async (): Promise<Order[]> => {
  return [...mockOrders];
};
