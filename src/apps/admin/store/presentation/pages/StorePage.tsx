import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../../domain/entities/Product";
import { Icons } from "../../../../client/songs/presentation/components/Icons";

export default function StorePage() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  
  // Estado para el Modal
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterBusqueda, setFilterBusqueda] = useState('');
  
  // Filtrar productos
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filterBusqueda.toLowerCase())
  );

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  // Formulario
  const initialForm: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "1",
    sizeId: "M",
    color: "",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",
    status: "active"
  };
  const [formData, setFormData] = useState<Product>(initialForm);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setSelectedSizes([]);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setFormData(product);
    setSelectedSizes(product.sizeId ? product.sizeId.split(',').map(s => s.trim()) : []);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      sizeId: selectedSizes.join(',')
    };
    if (isEditing) {
      await updateProduct(updatedFormData);
    } else {
      await createProduct(updatedFormData);
    }
    setShowModal(false);
  };

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
            onClick={handleOpenAdd}
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

        {/* BARRA DE FILTROS */}
        <div style={{ 
          display: 'flex',
          gap: '16px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          background: 'rgba(30, 41, 59, 0.4)',
          backdropFilter: 'blur(12px)',
          padding: '24px',
          borderRadius: '20px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          alignItems: 'flex-end'
        }}>
          {/* Búsqueda */}
          <div style={{ flex: 2, minWidth: '250px' }}>
            <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Buscar Producto
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                position: 'absolute', 
                left: '16px', 
                display: 'flex',
                color: '#8b5cf6',
                opacity: 0.7,
                pointerEvents: 'none'
              }}>
                <Icons.Search />
              </span>
              <input
                placeholder="Nombre, descripción..."
                value={filterBusqueda}
                onChange={(e) => setFilterBusqueda(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 45px',
                  background: 'rgba(30, 27, 75, 0.4)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box' as const,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Botón Reset */}
          {filterBusqueda && (
            <button
              onClick={() => setFilterBusqueda('')}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                fontSize: '13px',
                fontWeight: '700',
                padding: '10px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
            >
              Limpiar
            </button>
          )}
        </div>

        {/* GRID DE PRODUCTOS */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '4rem', fontSize: '16px' }}>
            Cargando productos...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(45, 27, 105, 0.3) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            backdropFilter: 'blur(10px)',
            color: '#cbd5e1'
          }}>
            <h3 style={{ color: '#8b5cf6', marginBottom: '8px', fontSize: '20px', fontWeight: '700' }}>No hay productos</h3>
            <p style={{ fontSize: '14px', margin: 0 }}>Crea uno nuevo para empezar</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(139, 92, 246, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                }}
              >
                {/* IMAGEN */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231e1b4b" width="400" height="300"/%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* CONTENIDO */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    color: '#e2e8f0',
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    lineHeight: '1.4',
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    color: '#cbd5e1',
                    margin: '0 0 16px 0',
                    fontSize: '13px',
                    lineHeight: '1.5',
                  }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                  }}>
                    <span style={{
                      color: '#8b5cf6',
                      fontSize: '24px',
                      fontWeight: '700',
                    }}>
                      ${product.price}
                    </span>
                  </div>

                  {/* TALLAS DISPONIBLES */}
                  {product.sizeId && (
                    <div style={{
                      marginBottom: '16px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                    }}>
                      {product.sizeId.split(',').map((size, idx) => (
                        <span key={idx} style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          background: 'rgba(139, 92, 246, 0.2)',
                          border: '1px solid rgba(139, 92, 246, 0.4)',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#8b5cf6',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>
                          {size.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* BOTONES */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                  }}>
                    <button
                      onClick={() => handleOpenEdit(product)}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: '#8b5cf6',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      }}
                    >
                      <Icons.Edit />
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      style={{
                        padding: '10px 16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                      }}
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '20px',
                padding: '48px',
                maxWidth: '700px',
                width: '95%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontWeight: '700',
                color: '#e2e8f0',
                marginBottom: '32px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                {isEditing ? <Icons.Edit /> : <Icons.Plus />}
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* NOMBRE - Full Width */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Nombre del Producto *
                  </label>
                  <input
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Camiseta Tour 2025"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      fontSize: '15px',
                      background: 'rgba(30, 27, 75, 0.5)',
                      border: '1.5px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box' as const,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                      e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* DESCRIPCIÓN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe el producto, características, detalles..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      fontSize: '15px',
                      background: 'rgba(30, 27, 75, 0.5)',
                      border: '1.5px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box' as const,
                      fontFamily: 'inherit',
                      resize: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                      e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* PRECIO + STOCK - 2 Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Precio *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      placeholder="25.00"
                      required
                      step="0.01"
                      min="0"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        fontSize: '15px',
                        background: 'rgba(30, 27, 75, 0.5)',
                        border: '1.5px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box' as const,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                        e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Stock *
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                      placeholder="50"
                      required
                      min="0"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        fontSize: '15px',
                        background: 'rgba(30, 27, 75, 0.5)',
                        border: '1.5px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box' as const,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                        e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* TALLAS - Button Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tallas Disponibles
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSizes(prev =>
                          prev.includes('Único')
                            ? prev.filter(s => s !== 'Único')
                            : [...prev, 'Único']
                        );
                      }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: selectedSizes.includes('Único')
                          ? '2px solid #8b5cf6'
                          : '2px solid rgba(139, 92, 246, 0.3)',
                        background: selectedSizes.includes('Único')
                          ? 'rgba(139, 92, 246, 0.2)'
                          : 'transparent',
                        color: selectedSizes.includes('Único')
                          ? '#8b5cf6'
                          : '#cbd5e1',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#8b5cf6';
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = selectedSizes.includes('Único')
                          ? '#8b5cf6'
                          : 'rgba(139, 92, 246, 0.3)';
                        e.currentTarget.style.background = selectedSizes.includes('Único')
                          ? 'rgba(139, 92, 246, 0.2)'
                          : 'transparent';
                      }}
                    >
                      Único
                    </button>
                    {sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSizes(prev =>
                            prev.includes(size)
                              ? prev.filter(s => s !== size)
                              : [...prev, size]
                          );
                        }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          border: selectedSizes.includes(size)
                            ? '2px solid #8b5cf6'
                            : '2px solid rgba(139, 92, 246, 0.3)',
                          background: selectedSizes.includes(size)
                            ? 'rgba(139, 92, 246, 0.2)'
                            : 'transparent',
                          color: selectedSizes.includes(size)
                            ? '#8b5cf6'
                            : '#cbd5e1',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#8b5cf6';
                          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = selectedSizes.includes(size)
                            ? '#8b5cf6'
                            : 'rgba(139, 92, 246, 0.3)';
                          e.currentTarget.style.background = selectedSizes.includes(size)
                            ? 'rgba(139, 92, 246, 0.2)'
                            : 'transparent';
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* IMAGEN URL + COLOR - 2 Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Imagen URL
                    </label>
                    <input
                      value={formData.imageUrl}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        fontSize: '15px',
                      background: 'rgba(30, 27, 75, 0.5)',
                      border: '1.5px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '12px',
                      color: '#e2e8f0',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box' as const,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                      e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Color
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={e => setFormData({...formData, color: e.target.value})}
                      placeholder="Ej: Rojo, Azul, Blanco..."
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        fontSize: '15px',
                        background: 'rgba(30, 27, 75, 0.5)',
                        border: '1.5px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box' as const,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                        e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* BOTONES */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      padding: '14px 24px',
                      background: 'transparent',
                      color: '#cbd5e1',
                      border: '1.5px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '15px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '14px 24px',
                      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '15px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
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
                    {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}