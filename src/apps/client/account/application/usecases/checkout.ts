import type { OrderRepository } from '../../domain/repositories/OrderRepository';
import type { Order } from '../../domain/models/Order';

export const checkout = (repository: OrderRepository) => {
  return async (data: any): Promise<Order> => {
    return await repository.checkout(data);
  };
};
