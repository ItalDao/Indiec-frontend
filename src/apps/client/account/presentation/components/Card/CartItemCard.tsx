import type { CartItem } from '../../../domain/models/CartItem';
import { Icons } from '../../../../songs/presentation/components/Icons';
import styles from './CartItemCard.module.css';

interface Props {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemCard = ({ item, onQuantityChange, onRemove }: Props) => {
  return (
    <div className={styles.card}>
      {/* Imagen */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className={styles.image}
      />

      {/* Detalles */}
      <div className={styles.details}>
        <h4>{item.product.name}</h4>
        <p>{item.size} • {item.color}</p>
      </div>

      {/* Precio unitario */}
      <div className={styles.priceBlock}>
        <span>Unitario</span>
        <strong>${item.product.price.toFixed(2)}</strong>
      </div>

      {/* Cantidad */}
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={e => onQuantityChange(Number(e.target.value))}
        className={styles.quantityInput}
      />

      {/* Total */}
      <div className={styles.totalBlock}>
        <span>Total</span>
        <strong>
          ${(item.product.price * item.quantity).toFixed(2)}
        </strong>
      </div>

      {/* Eliminar */}
      <button
        onClick={onRemove}
        className={styles.removeBtn}
        aria-label="Eliminar producto"
      >
        <Icons.Trash2 />
      </button>
    </div>
  );
};
