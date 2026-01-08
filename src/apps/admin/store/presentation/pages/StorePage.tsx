import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
// Borra 'Package' y 'DollarSign' de aquí
import { Plus, Edit, Trash, Shirt } from "lucide-react";
import type { Product } from "../../domain/entities/Product";

export default function StorePage() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  
  // Estado para el Modal
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Formulario
  const initialForm: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "1",
    sizeId: "3",
    color: "",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",
    status: "active"
  };
  const [formData, setFormData] = useState<Product>(initialForm);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateProduct(formData);
    } else {
      const { id, ...newProduct } = formData;
      await createProduct(newProduct);
    }
    setShowModal(false);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shirt size={32} />
            Gestión de Tienda
          </h1>
          <p className="page-subtitle">Administra el merchandising y el stock</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      {loading && <p style={{ color: '#94a3b8', textAlign: 'center' }}>Cargando productos...</p>}

      {/* Grid de Productos usando tus clases .grid y .grid-3 */}
      <div className="grid grid-3" style={{ gap: '24px' }}>
        {products.map((product) => (
          <div key={product.id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Imagen */}
            <div style={{ height: '200px', width: '100%', position: 'relative' }}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                background: 'rgba(0,0,0,0.7)', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Stock: {product.stock}
              </div>
            </div>

            {/* Contenido */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f1f5f9' }}>{product.name}</h3>
                <span style={{ color: '#8B5CF6', fontWeight: 'bold' }}>${product.price}</span>
              </div>
              
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px', flex: 1 }}>
                {product.description}
              </p>

              <div className="action-buttons" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button className="btn btn-sm btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleOpenEdit(product)}>
                  <Edit size={16} /> Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product.id)}>
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal usando tus clases .modal-overlay y .modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isEditing ? <Edit size={24} color="#8B5CF6"/> : <Plus size={24} color="#8B5CF6"/>}
              {isEditing ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input 
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej: Camiseta Tour"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Precio ($)</label>
                  <input 
                    type="number"
                    className="form-input"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input 
                    type="number"
                    className="form-input"
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Imagen URL</label>
                <input 
                  className="form-input"
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-textarea"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}