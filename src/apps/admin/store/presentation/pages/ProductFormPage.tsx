import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../domain/models/Product';

interface Props {
  onSubmit: (product: Product) => void;
  initialData?: Partial<Product>;
  isEditing?: boolean;
}

export const ProductFormPage = ({ onSubmit, initialData, isEditing = false }: Props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    size: initialData?.size || '',
    color: initialData?.color || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    images: initialData?.images || [],
    active: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/'); // Volver al catálogo o a la lista de productos
  };

  // Estilos básicos (puedes moverlos a un archivo CSS o usar styled-components/tailwind después)
  const containerStyle: React.CSSProperties = {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#1E293B',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  };

  const labelStyle: React.CSSProperties = {
    color: '#A78BFA',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: '0.3rem',
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #475569',
    backgroundColor: '#0F172A',
    color: 'white',
    fontSize: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.9rem',
    backgroundColor: '#7C3AED',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#A78BFA', marginBottom: '1.5rem', textAlign: 'center' }}>
        {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Nombre del producto *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Camiseta Indie"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Categoría *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Ej: Camisetas"
            style={inputStyle}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Talla</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Ej: M"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Ej: Negro"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Precio *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ej: 25.00"
              style={inputStyle}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label style={labelStyle}>Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ej: 50"
              style={inputStyle}
              required
              min="0"
            />
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};