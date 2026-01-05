import { useEffect, useState } from 'react';
import type { Order } from '../../domain/models/Order';
import { orderApi } from '../../infrastructure/api/orderApi';
import { getMockOrders } from '../../infrastructure/mocks/mockOrders';

export const useCheckout = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);

    const data = import.meta.env.DEV
      ? await getMockOrders()
      : await orderApi.getMyOrders();

    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    orders,
    loading,
    reload: loadOrders,
  };
};
