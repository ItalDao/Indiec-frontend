// src/apps/admin/store/presentation/pages/ProductsPage.tsx
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../../domain/entities/Product";
import { Icons } from "../../../../client/songs/presentation/components/Icons";

export const ProductsPage = () => {
  const { products, loading, deleteProduct } = useProducts();
  const [filterBusqueda, setFilterBusqueda] = useState('');

  // Filtrar productos por nombre
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filterBusqueda.toLowerCase())
  );

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: 'clamp(42px, 7vw, 64px)', 
            fontWeight: '900',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            marginBottom: '16px',
            letterSpacing: '-2px',
          }}>
            Gestión de Tienda
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: 0,
          }}>
            Administra el inventario y productos de la plataforma
          </p>
        </div>

        {/* BOTÓN CREAR */}
        <div style={{ marginBottom: '40px' }}>
          <button
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
          >
            <Icons.Plus />
            Nuevo Producto
          </button>
        </div>

        {/* BARRA DE BÚSQUEDA */}
        <div style={{
          marginBottom: '40px',
          display: 'flex',
          gap: '16px',
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          padding: '24px',
          borderRadius: '20px',
          border: '1.5px solid rgba(139, 92, 246, 0.4)',
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#8b5cf6', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
              Buscar Producto
            </label>
            <input
              placeholder="Nombre..."
              value={filterBusqueda}
              onChange={(e) => setFilterBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(30, 27, 75, 0.7)',
                border: '1.5px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '10px',
                color: '#e2e8f0',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.9)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.7)';
              }}
            />
          </div>
        </div>

        {/* LISTA DE PRODUCTOS */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '4rem' }}>
            Cargando productos...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(45, 27, 105, 0.3) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            color: '#cbd5e1'
          }}>
            <h3 style={{ color: '#8b5cf6', marginBottom: '8px' }}>No hay productos</h3>
            <p>Crea uno nuevo para empezar</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                }}
              >
                {/* Imagen */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    background: 'rgba(30, 27, 75, 0.5)',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231e1b4b" width="400" height="300"/%3E%3C/svg%3E';
                  }}
                />
                {/* Contenido */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#e2e8f0', margin: '0 0 12px 0', fontSize: '18px', fontWeight: '700' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: '#cbd5e1', margin: '0 0 12px 0', fontSize: '13px', lineHeight: '1.5' }}>
                    {product.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ color: '#8b5cf6', fontSize: '24px', fontWeight: '700' }}>${product.price}</span>
                    <span style={{ color: '#cbd5e1', fontSize: '13px' }}>Stock: {product.stock}</span>
                  </div>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};