import type { CartItem } from '../../../domain/models/CartItem';
import { Icons } from '../../../../songs/presentation/components/Icons';

interface Props {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemCard = ({ item, onQuantityChange, onRemove }: Props) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '16px',
      padding: '1.25rem',
      display: 'grid',
      gridTemplateColumns: '100px 1fr auto auto auto',
      gap: '1rem',
      alignItems: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
    }}
    onMouseEnter={e => {
      const target = e.currentTarget;
      target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
      target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(139, 92, 246, 0.2)';
    }}
    onMouseLeave={e => {
      const target = e.currentTarget;
      target.style.borderColor = 'rgba(139, 92, 246, 0.2)';
      target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)';
    }}
    >
      {/* Imagen */}
      <img
        src={item.product.image}
        alt={item.product.name}
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
          borderRadius: '12px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}
      />

      {/* Detalles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h4 style={{
          margin: 0,
          color: '#E5E7EB',
          fontSize: '1rem',
          fontWeight: 600,
        }}>
          {item.product.name}
        </h4>
        <p style={{
          margin: 0,
          color: '#A78BFA',
          fontSize: '0.85rem',
          fontWeight: 500,
        }}>
          {item.size} • {item.color}
        </p>
      </div>

      {/* Precio unitario */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
      }}>
        <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>Unitario</span>
        <strong style={{
          color: '#A78BFA',
          fontSize: '1rem',
          fontWeight: 700,
        }}>
          ${item.product.price.toFixed(2)}
        </strong>
      </div>

      {/* Cantidad */}
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={e => onQuantityChange(Number(e.target.value))}
        style={{
          width: '60px',
          padding: '0.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          background: 'rgba(15, 23, 42, 0.7)',
          color: '#E5E7EB',
          fontSize: '0.9rem',
          textAlign: 'center',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onFocus={e => {
          const target = e.currentTarget;
          target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
          target.style.background = 'rgba(15, 23, 42, 0.9)';
          target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
        }}
        onBlur={e => {
          const target = e.currentTarget;
          target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
          target.style.background = 'rgba(15, 23, 42, 0.7)';
          target.style.boxShadow = 'none';
        }}
      />

      {/* Total */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
      }}>
        <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>Total</span>
        <strong style={{
          color: '#8b5cf6',
          fontSize: '1.1rem',
          fontWeight: 700,
        }}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </strong>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={onRemove}
        style={{
          padding: '0.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#fca5a5',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          const target = e.currentTarget;
          target.style.background = 'rgba(239, 68, 68, 0.2)';
          target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
          target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={e => {
          const target = e.currentTarget;
          target.style.background = 'rgba(239, 68, 68, 0.1)';
          target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
          target.style.transform = 'scale(1)';
        }}
      >
        <Icons.Trash2 />
      </button>
    </div>
  );
};
