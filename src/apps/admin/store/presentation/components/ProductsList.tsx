// src/apps/admin/store/presentation/components/ProductsList.tsx
import type { Product } from '../../domain/models/Product';
import { ProductCard } from './ProductCard'; // Asegúrate de tener este componente bien hecho

interface Props {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

export const ProductsList = ({ products, loading, onDelete, onEdit }: Props) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
        Cargando catálogo de productos...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '6rem 2rem', 
        color: '#94a3b8',
        background: 'rgba(30,27,75,0.2)',
        borderRadius: '12px'
      }}>
        <h2 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Aún no hay productos en la tienda</h2>
        <p>Haz clic en "+ Nuevo producto" para empezar a agregar tu catálogo.</p>
      </div>
    );
  }

  // Agrupación por categoría (igual que en canciones)
  const productsByCategory = products.reduce((groups: Record<string, Product[]>, product) => {
    const category = product.category || 'Sin categoría';
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});

  return (
    <div style={{ padding: '1rem 0' }}>
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <section key={category} style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            color: '#a78bfa', 
            fontSize: '1.4rem', 
            marginBottom: '1.2rem',
            borderLeft: '4px solid #7c3aed',
            paddingLeft: '1rem'
          }}>
            {category}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
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