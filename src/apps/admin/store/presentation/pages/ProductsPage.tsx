// src/apps/admin/store/presentation/pages/ProductsPage.tsx
import { useState } from "react";
import { ProductsList } from "../components/ProductsList";
import { ProductForm } from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../../domain/models/Product";

export const ProductsPage = () => {
  const {
    products,
    loading,
    deleteProduct,
    loadProducts, // Usado para refrescar la lista después de crear/editar
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Refrescar la lista después de guardar (crear o editar)
  const handleFormSuccess = () => {
    loadProducts?.(); // El ? evita error si loadProducts no existe
    handleClose();
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header con título y botón de creación */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}
      >
        <h1
          style={{
            color: "#a78bfa",
            margin: 0,
            fontSize: "2rem",
            fontWeight: 600,
          }}
        >
          Tienda
        </h1>

        <button
          onClick={handleCreate}
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            color: "white",
            padding: "0.9rem 1.8rem",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.35)";
          }}
        >
          + Nuevo producto
        </button>
      </div>

      {/* Lista de productos */}
      <ProductsList
        products={products}
        loading={loading}
        onDelete={deleteProduct}
        onEdit={handleEdit}
      />

      {/* Modal del formulario */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.85)", // Fondo más oscuro y acorde al tema
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)", // Efecto blur bonito (soporte moderno)
          }}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
            }}
          >
            <ProductForm
              product={editingProduct}
              onClose={handleClose}
              onSubmit={handleFormSuccess} // Refresca la lista al guardar
              isEditing={!!editingProduct} // Para cambiar título/texto del botón
            />
          </div>
        </div>
      )}
    </div>
  );
};