import { Button } from '../../../../../../shared/ui';
import styles from './ProfileFavorites.module.css';

interface Props {
  products: number[];
  onRemove: (id: number) => void;
}

export const ProfileFavorites = ({ products, onRemove }: Props) => {
  if (products.length === 0) {
    return (
      <div className={styles.emptyBox}>
        <span>💜</span>
        <p>No tienes productos favoritos aún</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {products.map(id => (
        <li key={id} className={styles.item}>
          <div className={styles.info}>
            <span className={styles.badge}>#{id}</span>
            <p className={styles.name}>Producto favorito</p>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRemove(id)}
          >
            Quitar
          </Button>
        </li>
      ))}
    </ul>
  );
};
