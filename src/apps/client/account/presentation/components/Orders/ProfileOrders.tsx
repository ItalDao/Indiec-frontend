import { Card } from '../../../../../../shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileOrders.module.css';

interface Props {
  orders: any[];
}

export const ProfileOrders = ({ orders }: Props) => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return <p className={styles.emptyMessage}>No tienes pedidos aún.</p>;
  }

  return (
    <>
      {orders.map(order => (
        <Card
          key={order.id}
          className={styles.card}
          onClick={() => navigate(`/client/orders/${order.id}`)}
        >
          <p><strong>Orden:</strong> #{order.id}</p>
          <p><strong>Total:</strong> ${(order.total ?? 0).toFixed(2)}</p>
        </Card>
      ))}
    </>
  );
};
