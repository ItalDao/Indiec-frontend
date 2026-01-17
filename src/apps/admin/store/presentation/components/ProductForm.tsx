// src/apps/admin/store/presentation/components/ProductForm.tsx
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import type { Product } from '../../domain/entities/Product';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  isEditing?: boolean;
}

export const ProductForm = ({
  product,
  onClose,
  onSubmit,
  isEditing = false,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    description: '',
    categoryId: '',
    sizeId: '',
    color: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    status: 'active',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || '',
        name: product.name || '',
        description: product.description || '',
        categoryId: product.categoryId || '',
        sizeId: product.sizeId || '',
        color: product.color || '',
        price: product.price || 0,
        stock: product.stock || 0,
        imageUrl: product.imageUrl || '',
        status: product.status || 'active',
      });
    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock'
          ? Number(value) || 0
          : name === 'images'
          ? value.split(',').map((url) => url.trim())
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.categoryId || formData.price <= 0) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    onSubmit(formData as Product);
  };

  const inputStyle: React.CSSProperties = {
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
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* CONTENEDOR CON SCROLL */}
      <div style={{ 
        flex: 1, 
        maxHeight: '450px',
        overflowY: 'auto', 
        paddingRight: '10px',
        paddingBottom: '1rem',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px' 
      }}>

        {/* TÍTULO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Nombre *
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Camiseta Indie"
            required
            style={inputStyle}
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

        {/* CATEGORÍA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Categoría *
          </label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ej: Camisetas"
            required
            style={inputStyle}
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

        {/* TAMAÑO + COLOR */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Tamaño
            </label>
            <input
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Ej: M"
              style={inputStyle}
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
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Ej: Negro"
              style={inputStyle}
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

        {/* PRECIO + STOCK */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Precio *
            </label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ej: 25.00"
              required
              min="0"
              step="0.01"
              style={inputStyle}
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
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ej: 50"
              required
              min="0"
              style={inputStyle}
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

        {/* IMÁGENES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            URLs de imágenes (separadas por coma)
          </label>
          <input
            name="images"
            value={formData.images?.join(', ')}
            onChange={handleChange}
            placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
            style={inputStyle}
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
        marginTop: '24px', 
        paddingTop: '24px', 
        borderTop: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            flex: 1,
            padding: '14px 24px',
            background: 'rgba(30, 27, 75, 0.4)',
            color: '#cbd5e1',
            border: '1.5px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '15px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
            e.currentTarget.style.background = 'rgba(30, 27, 75, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.background = 'rgba(30, 27, 75, 0.4)';
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
            borderRadius: '12px',
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
  );
};