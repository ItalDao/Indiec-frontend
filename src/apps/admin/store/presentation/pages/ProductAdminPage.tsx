import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductsList } from '../components/ProductsList'; // Assume adapted
import type { Product } from '../../domain/models/Product';

export const ProductAdminPage = () => {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', category: '', size: '', color: '', price: 0, stock: 0, images: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let result;
    if (editingProduct && editingProduct.id) {
      result = await updateProduct(editingProduct.id, formData as Product);
    } else {
      result = await createProduct(formData as Product);
    }
    
    if (result.success) {
      alert(editingProduct ? "¡Actualizado!" : "¡Creado!");
      setEditingProduct(null);
      setFormData({ name: '', category: '', size: '', color: '', price: 0, stock: 0, images: [] });
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
      <div style={{ flex: 1, maxWidth: '500px' }}>
        <h2 style={{ color: '#A78BFA' }}>Registrar Producto</h2>
        <form onSubmit={handleGuardar} style={{ display: 'grid', gap: '1rem', backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '12px' }}>
          <input name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} style={inputStyle} required />
          <input name="category" placeholder="Categoría" value={formData.category} onChange={handleInputChange} style={inputStyle} required />
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input name="size" placeholder="Tamaño" value={formData.size} onChange={handleInputChange} style={inputStyle} />
            <input name="color" placeholder="Color" value={formData.color} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <input name="price" type="number" placeholder="Precio" value={formData.price} onChange={handleInputChange} style={inputStyle} required />
            <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleInputChange} style={inputStyle} required />
          </div>
          
          <input name="images" placeholder="URLs de imágenes (separadas por coma)" value={formData.images?.join(',')} onChange={handleInputChange} style={inputStyle} />
          
          <button type="submit" style={{ backgroundColor: '#7C3AED', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            GUARDAR
          </button>
        </form>
      </div>
      
      <div style={{ flex: 1.2 }}>
        <h2 style={{ marginBottom: '1rem' }}>Catálogo de Productos</h2>
        <ProductsList products={products} loading={loading} onDelete={deleteProduct} onEdit={handleEdit} />
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '0.8rem',
  borderRadius: '6px',
  border: '1px solid #334155',
  backgroundColor: '#0F172A',
  color: 'white',
  width: '100%',
  boxSizing: 'border-box' as 'border-box'
};