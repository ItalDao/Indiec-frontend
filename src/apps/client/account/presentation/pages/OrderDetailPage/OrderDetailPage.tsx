import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderApi } from '../../../infrastructure/api/orderApi';
import type { Order } from '../../../domain/models/Order';
import { Button, Card } from '../../../../../../shared/ui';
import styles from './OrderDetailPage.module.css';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await orderApi.getMyOrders();
        const found = data.find(o => String(o.id) === String(id)) ?? null;
        setOrder(found);
      } catch (err) {
        console.error('Error loading orders', err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <p className={styles.container}>Cargando orden...</p>;
  }

  if (!order) {
    return <p className={styles.container}>Orden no encontrada</p>;
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/client/orders')}
          className={styles.backButton}
        >
          ← Volver a mis pedidos
        </Button>

        <h1>Orden #{order.id}</h1>

        <div className={styles.headerInfo}>
          <span>
            Estado: <strong>{order.status}</strong>
          </span>
          <span>
            Creado: {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* ITEMS */}
      <Card className={styles.itemsCard}>
        <h3>🛍 Productos</h3>

        <div>
          {order.items.map((it, idx) => (
            <div key={idx} className={styles.itemRow}>
              <div className={styles.itemDetails}>
                <strong>{it.product.name}</strong>
                <p>{it.size} • {it.color}</p>
              </div>

              <div className={styles.itemPrice}>
                <p>{it.quantity} × ${it.product.price.toFixed(2)}</p>
                <strong>${(it.quantity * it.product.price).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ENVÍO */}
      {order.shippingMethod && (
        <Card className={styles.shippingCard}>
          <h3>🚚 Envío</h3>
          <p>
            <strong>Método:</strong> {order.shippingMethod}
          </p>
          <p>
            <strong>Costo:</strong> ${order.shippingCost?.toFixed(2)}
          </p>
        </Card>
      )}

      {/* TOTAL */}
      <Card className={styles.totalCard}>
        <h2>Total</h2>
        <h2>${order.total.toFixed(2)}</h2>
      </Card>
    </div>
  );
};
