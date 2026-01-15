// src/apps/admin/store/presentation/components/ProductForm.tsx
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import type { Product } from '../../domain/models/Product';

interface ProductFormProps {
  product?: Product | null;          // Para edición (opcional)
  onClose: () => void;               // Para cerrar el modal
  onSubmit: (data: Product) => void; // Datos finales para crear/editar
  isEditing?: boolean;               // Opcional, pero útil para cambiar textos
}

export const ProductForm = ({
  product,
  onClose,
  onSubmit,
  isEditing = false,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    category: '',
    size: '',
    color: '',
    price: 0,
    stock: 0,
    images: [],
    active: true,
    // createdAt se genera en el backend normalmente
  });

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        size: product.size || '',
        color: product.color || '',
        price: product.price || 0,
        stock: product.stock || 0,
        images: product.images || [],
        active: product.active ?? true,
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
          ? value.split(',').map((url) => url.trim()) // Convertir string a array de URLs
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validación básica (puedes expandirla)
    if (!formData.name || !formData.category || formData.price <= 0) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    onSubmit(formData as Product);
  };

  return (
    <div
      style={{
        background: '#1e293b',
        padding: '2rem',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '600px',
        color: '#e2e8f0',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#a78bfa', margin: 0 }}>
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: '1px solid #94a3b8',
            color: '#94a3b8',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          × Cerrar
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label style={{ display: 'block', color: '#a78bfa', marginBottom: '0.4rem' }}>Nombre *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Camiseta Indie"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#a78bfa', marginBottom: '0.4rem' }}>Categoría *</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ej: Camisetas"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#a78bfa', marginBottom: '0.4rem' }}>Tamaño</label>
            <input name="size" value={formData.size} onChange={handleChange} placeholder="Ej: M" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#a78bfa', marginBottom: '0.4rem' }}>Color</label>
            <input name="color" value={formData.color} onChange={handleChange} placeholder="Ej: Negro" style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#a78bfa', marginBottom: '0.4rem' }}>Precio *</label>
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
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#a78bfa', marginBottom: '0.4rem' }}>Stock *</label>
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ej: 50"
              required
              min="0"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: '#a78bfa', marginBottom: '0.4rem' }}>
            URLs de imágenes (separadas por coma)
          </label>
          <input
            name="images"
            value={formData.images?.join(', ')}
            onChange={handleChange}
            placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

// Estilo compartido para inputs
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: '8px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: '#e2e8f0',
  fontSize: '1rem',
};