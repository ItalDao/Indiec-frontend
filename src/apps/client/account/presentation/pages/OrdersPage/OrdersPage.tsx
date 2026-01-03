import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../../../infrastructure/api/orderApi';
import type { Order } from '../../../domain/models/Order';
import { Card, Button } from '../../../../../../shared/ui';
import styles from './OrdersPage.module.css';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderApi.getMyOrders();
        setOrders(data || []);
      } catch (error) {
        console.error('Error cargando pedidos', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <p className={styles.container}>Cargando pedidos...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>📦 Mis pedidos</h2>
        <p>Aún no has realizado ningún pedido.</p>

        <Button onClick={() => navigate('/client/store')}>Ir a la tienda</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>📦 Mis pedidos</h1>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {orders.map(order => (
          <Card key={order.id} className={styles.cardRow}>
            <div className={styles.orderInfo}>
              <h3>Orden #{order.id}</h3>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
              <p>
                Estado: <strong>{order.status}</strong>
              </p>
            </div>

            <div className={styles.orderActions}>
              <h3>${order.total.toFixed(2)}</h3>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/client/orders/${order.id}`)}
              >
                Ver detalle →
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
