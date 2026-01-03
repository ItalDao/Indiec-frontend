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
      <div className="container">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🛍️ Tienda</h1>

      {/* 🔹 filtros */}
      <ProductFilters onChange={handleFilters} />

      {/* 🔹 grilla */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
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
  );
};
