// presentation/components/ProductCard.tsx
import type { Product } from '../../domain/entities/Product';
import { Icons } from '../../../../client/songs/presentation/components/Icons';

interface Props {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  const mainImage = product.imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231e1b4b' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23cbd5e1' text-anchor='middle' dy='.3em'%3EProducto%3C/text%3E%3C/svg%3E";

  return (
    <div style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = 'translateY(-8px)';
      el.style.boxShadow = '0 16px 40px rgba(139, 92, 246, 0.4)';
      el.style.borderColor = 'rgba(139, 92, 246, 0.5)';
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = 'translateY(0)';
      el.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
      el.style.borderColor = 'rgba(139, 92, 246, 0.2)';
    }}
    >
      {/* IMAGEN */}
      <img 
        src={mainImage} 
        alt={product.name}
        style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
      />

      {/* GRADIENTE OVERLAY */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.8) 100%)',
        pointerEvents: 'none',
      }} />

      {/* CONTENIDO */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24px',
        color: '#e2e8f0',
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#fff' }}>
          {product.name}
        </h3>
        <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {product.category}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', marginBottom: '4px' }}>
              ${product.price}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Stock: <span style={{ color: '#cbd5e1', fontWeight: '600' }}>{product.stock}</span></div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEdit(product)}
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                color: '#8b5cf6',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              }}
            >
              <Icons.Edit style={{ width: '16px', height: '16px' }} />
              Editar
            </button>
            <button
              onClick={() => onDelete(product.id!)}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#ef4444',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
              }}
            >
              <Icons.Trash style={{ width: '16px', height: '16px' }} />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};