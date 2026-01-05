import type { Product } from '../../domain/models/Product';
import { useFavorites } from '../../../account/presentation/hooks/useFavorites';
import { Icons } from '../../../songs/presentation/components/Icons';

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
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: `1px solid ${isFavorite ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)'}`,
        boxShadow: isFavorite
          ? `0 20px 40px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
          : `0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)`;
        e.currentTarget.style.borderColor = '#8b5cf6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isFavorite
          ? `0 20px 40px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
          : `0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)`;
        e.currentTarget.style.borderColor = isFavorite ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)';
      }}
    >
      {/* Imagen */}
      <div
        style={{
          width: '100%',
          height: '200px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.1))',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />

        {/* Botón favorito */}
        <button
          onClick={toggleFavorite}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: `rgba(139, 92, 246, ${isFavorite ? 0.95 : 0.2})`,
            border: `2px solid rgba(139, 92, 246, 0.5)`,
            cursor: 'pointer',
            fontSize: '20px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.95)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `rgba(139, 92, 246, ${isFavorite ? 0.95 : 0.2})`;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isFavorite ? (
            <span style={{ color: '#ec4899', fontSize: '20px' }}><Icons.HeartFilled /></span>
          ) : (
            <span style={{ color: '#cbd5e1', fontSize: '20px' }}><Icons.Heart /></span>
          )}
        </button>
      </div>

      {/* Contenido */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          marginTop: 0,
          marginBottom: '8px',
          fontSize: '15px',
          fontWeight: '700',
          color: '#fff',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.name}
        </h3>

        <p style={{ 
          color: '#cbd5e1', 
          fontSize: '12px',
          margin: '0 0 12px 0',
          fontWeight: '500',
        }}>
          {product.category}
          {product.artist && ` • ${product.artist}`}
        </p>

        <div style={{ flex: 1 }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: `1px solid rgba(139, 92, 246, 0.2)`,
        }}>
          <strong style={{ 
            fontSize: '16px',
            fontWeight: '700',
            color: '#8b5cf6',
          }}>
            ${product.price.toFixed(2)}
          </strong>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            style={{
              padding: '8px 16px',
              background: '#8b5cf6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '12px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
};
