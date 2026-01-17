// src/apps/admin/store/presentation/components/ProductsList.tsx
import type { Product } from '../../domain/entities/Product';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

export const ProductsList = ({ products, loading, onDelete, onEdit }: Props) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#cbd5e1', fontSize: '16px' }}>
        Cargando catálogo de productos...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '6rem 2rem', 
        color: '#cbd5e1',
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(45, 27, 105, 0.3) 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '24px', fontWeight: '700' }}>Aún no hay productos en la tienda</h2>
        <p style={{ fontSize: '15px', color: '#cbd5e1' }}>Haz clic en "+ Nuevo Producto" para empezar a agregar tu catálogo.</p>
      </div>
    );
  }

  // Agrupación por categoryId
  const productsByCategory = products.reduce((groups: Record<string, Product[]>, product) => {
    const category = product.categoryId || 'Sin categoría';
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});

  return (
    <div style={{ padding: '1rem 0' }}>
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <section key={category} style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '700',
            color: '#e2e8f0',
            marginBottom: '24px',
            borderLeft: '4px solid #8b5cf6',
            paddingLeft: '16px',
            margin: 0,
            marginBottom: '24px',
          }}>
            {category}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {categoryProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};