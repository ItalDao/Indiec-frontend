import type { Order } from '../models/Order';

export interface OrderRepository {
  checkout(data: any): Promise<Order>;
  getMyOrders(): Promise<Order[]>;
}
