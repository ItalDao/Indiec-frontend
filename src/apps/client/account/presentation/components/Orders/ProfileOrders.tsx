import { Card } from '../../../../../../shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileOrders.module.css';

interface Props {
  orders: any[];
}

export const ProfileOrders = ({ orders }: Props) => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className={styles.emptyBox}>
        <span>📦</span>
        <p>No tienes pedidos aún</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {orders.map(order => (
        <li key={order.id}>
          <Card
            className={styles.card}
            onClick={() => navigate(`/client/orders/${order.id}`)}
          >
            <div className={styles.info}>
              <div>
                <p className={styles.label}>Orden</p>
                <p className={styles.value}>#{order.id}</p>
              </div>

              <div className={styles.amount}>
                <p className={styles.label}>Total</p>
                <p className={styles.price}>
                  ${(order.total ?? 0).toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};
