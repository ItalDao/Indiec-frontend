import { Button } from '../../../../../../shared/ui';
import styles from './ProfileFavorites.module.css';

interface Props {
  products: number[];
  onRemove: (id: number) => void;
}

export const ProfileFavorites = ({ products, onRemove }: Props) => {
  if (products.length === 0) {
    return <p className={styles.emptyMessage}>No hay productos favoritos.</p>;
  }

  return (
    <ul className={styles.list}>
      {products.map(id => (
        <li key={id} className={styles.item}>
          Producto #{id}
          <Button size="sm" onClick={() => onRemove(id)}>
            Quitar
          </Button>
        </li>
      ))}
    </ul>
  );
};
