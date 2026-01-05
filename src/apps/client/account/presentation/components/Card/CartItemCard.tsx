import type { CartItem } from '../../../domain/models/CartItem';
import { Button, Card } from '../../../../../../shared/ui';
import styles from './CartItemCard.module.css';

interface Props {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemCard = ({ item, onQuantityChange, onRemove }: Props) => {
  return (
    <Card className={styles.card}>
      <img
        src={item.product.image}
        alt={item.product.name}
        className={styles.image}
      />

      <div className={styles.details}>
        <h4>{item.product.name}</h4>
        <p>{item.size} • {item.color}</p>
        <strong className={styles.price}>${item.product.price.toFixed(2)}</strong>
      </div>

      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={e => onQuantityChange(Number(e.target.value))}
        className={styles.quantityInput}
      />

      <strong className={styles.price}>
        ${(item.product.price * item.quantity).toFixed(2)}
      </strong>

      <Button
        variant="secondary"
        size="sm"
        onClick={onRemove}
      >
        Eliminar
      </Button>
    </Card>
  );
};
