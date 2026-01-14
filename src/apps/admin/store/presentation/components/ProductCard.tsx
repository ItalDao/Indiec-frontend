// presentation/components/ProductCard.tsx
import type { Product } from '../../domain/models/Product';

interface Props {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  const mainImage = product.images?.[0] || "https://placehold.co/400x300/1e293b/a78bfa?text=PRODUCTO";

  return (
    <div className="song-card" style={{
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 16px 48px rgba(139,92,246,0.4)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
    }}
    >
      <img 
        src={mainImage} 
        alt={product.name}
        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
      />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        color: 'white',
      }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{product.name}</h3>
        <p style={{ margin: '0.3rem 0', opacity: 0.8 }}>{product.category}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
          <div>
            <strong style={{ color: '#a78bfa' }}>${product.price}</strong>
            <span style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>Stock: {product.stock}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button onClick={() => onEdit(product)}>✏️</button>
            <button onClick={() => onDelete(product.id!)} style={{ color: '#ef4444' }}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
};