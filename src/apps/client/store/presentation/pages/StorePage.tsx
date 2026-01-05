import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import type { ProductFiltersValue } from '../../domain/models/ProductFilters';

export const StorePage = () => {
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  // 🔹 productos filtrados
  const [filtered, setFiltered] = useState(products);

  // 🔹 sincroniza cuando llegan los productos
  useEffect(() => {
    setFiltered(products);
  }, [products]);

  // 🔹 lógica de filtros (100% typesafe)
  const handleFilters = (filters: ProductFiltersValue) => {
    let result = products;

    if (filters.category) {
      result = result.filter(
        product => product.category === filters.category
      );
    }

    if (filters.size) {
      result = result.filter(
        product => product.sizes?.includes(filters.size!)
      );
    }

    if (filters.artist) {
      const artist = filters.artist.toLowerCase();
      result = result.filter(
        product => product.artist?.toLowerCase().includes(artist)
      );
    }

    if (filters.minPrice !== undefined) {
      result = result.filter(
        product => product.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(
        product => product.price <= filters.maxPrice!
      );
    }

    setFiltered(result);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '20px',
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: `3px solid rgba(139, 92, 246, 0.2)`,
          borderTop: `3px solid #8b5cf6`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{
          fontSize: '15px',
          color: '#cbd5e1',
          fontWeight: '500',
        }}>
          Cargando tienda...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
      backgroundAttachment: "fixed",
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px', position: 'relative', paddingTop: '20px' }}>
          {/* Background gradient accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100px',
            width: '400px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)',
            borderRadius: '50%',
            pointerEvents: 'none',
            filter: 'blur(40px)',
          }} />
          
          <h1 
            style={{ 
              fontSize: 'clamp(42px, 7vw, 64px)', 
              fontWeight: '900',
              marginBottom: '16px',
              color: '#fff',
              margin: 0,
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
            }}
          >
            Tienda
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            margin: '0px', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Productos exclusivos de artistas independientes. Apoya a tu talento favorito.
          </p>
        </div>

        {/* 🔹 filtros */}
        <ProductFilters onChange={handleFilters} />

        {/* 🔹 grilla */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            marginTop: '40px',
          }}
      >
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/client/store/${product.id}`)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};
