import type { Product } from '../../domain/models/Product';
import { Card, Button } from '../../../../../shared/ui';
import { useFavorites } from '../../../account/presentation/hooks/useFavorites';

interface Props {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: Props) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.products.includes(product.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite('products', product.id);
    } else {
      addFavorite('products', product.id);
    }
  };

  return (
    <Card
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={onClick}
    >
      {/* ❤️ Favorito */}
      <button
        onClick={toggleFavorite}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          borderRadius: '0.5rem',
        }}
      />

      <h3 style={{ marginTop: '0.5rem' }}>{product.name}</h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        {product.category}
        {product.artist && ` • ${product.artist}`}
      </p>

      <strong style={{ display: 'block', margin: '0.5rem 0' }}>
        ${product.price.toFixed(2)}
      </strong>

      <Button
        variant="primary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Ver detalle
      </Button>
    </Card>
  );
};
