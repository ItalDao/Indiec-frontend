import { api } from '../../../../../shared/services/api';
import type { OrderRepository } from '../../domain/repositories/OrderRepository';
import type { Order } from '../../domain/models/Order';
import { mockOrders } from '../mocks/mockOrders';
import { mockCartItems } from '../mocks/mockCart';

interface CheckoutData {
  shippingMethod: 'standard' | 'express';
  shippingCost: number;
  total: number;
}

export const orderApi: OrderRepository = {
  async checkout(data: CheckoutData): Promise<Order> {
    if (import.meta.env.DEV) {
      if (mockCartItems.length === 0) {
        throw new Error('Carrito vacío');
      }

      const id = (mockOrders.at(-1)?.id ?? 0) + 1;

      const order: Order = {
        id,
        items: [...mockCartItems],
        shippingMethod: data.shippingMethod,
        shippingCost: data.shippingCost,
        total: data.total,
        status: 'pagado',
        createdAt: new Date().toISOString(),
      };

      mockOrders.push(order);
      mockCartItems.length = 0;

      return order;
    }

    return api.post<Order>('/carrito/checkout', data);
  },

  async getMyOrders(): Promise<Order[]> {
    if (import.meta.env.DEV) {
      return [...mockOrders];
    }

    return api.get<Order[]>('/pedido');
  },
};
