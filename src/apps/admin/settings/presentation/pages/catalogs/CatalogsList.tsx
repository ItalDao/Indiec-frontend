import { useState } from "react";
import { useCatalogs } from "../../hooks/useCatalogs";
import type { CatalogType } from "../../domain/entities/Catalog";

export default function CatalogsList() {
  const [activeTab, setActiveTab] = useState<CatalogType>("genres");
  const { items, loading, error, createItem, updateItem, deleteItem } = useCatalogs(activeTab);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [currentItem, setCurrentItem] = useState({ id: "", name: "", code: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setCurrentItem({ id: "", name: "", code: "" });
    setModalType("add");
    setShowModal(true);
  };

  const handleEdit = (item: typeof currentItem) => {
    setCurrentItem({ ...item });
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteItem(itemToDelete);
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleSave = async () => {
    if (modalType === "add") {
      const { id, ...itemData } = currentItem;
      await createItem(itemData);
    } else if (modalType === "edit") {
      await updateItem(currentItem);
    }
    setShowModal(false);
  };

  const tabs = [
    { id: "genres", label: "🎵 Géneros Musicales" },
    { id: "countries", label: "🌍 Países" },
    { id: "categories", label: "📦 Categorías" },
    { id: "sizes", label: "📏 Tallas" },
  ];

  if (loading && items.length === 0) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
          <p style={{ color: '#94a3b8' }}>Cargando catálogos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="card" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <p style={{ color: '#fca5a5' }}>❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Catálogos Maestros</h1>
        <p className="page-subtitle">Gestiona los catálogos del sistema</p>
      </div>

      <div style={{ marginBottom: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`btn ${activeTab === tab.id ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveTab(tab.id as CatalogType)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            {tabs.find(t => t.id === activeTab)?.label}
          </h3>
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Agregar
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                {(activeTab === "genres" || activeTab === "countries" || activeTab === "sizes") && <th>Código</th>}
                <th style={{ textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: "500" }}>{item.name}</td>
                  {(activeTab === "genres" || activeTab === "countries" || activeTab === "sizes") && (
                    <td style={{ color: "#94a3b8" }}>{item.code}</td>
                  )}
                  <td>
                    <div className="action-buttons" style={{ justifyContent: "center" }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(item)}>
                        ✏️ Editar
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {modalType === "add" ? "➕ Agregar item" : "✏️ Editar item"}
            </h2>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  className="form-input"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  placeholder="Nombre"
                />
              </div>
              {(activeTab === "genres" || activeTab === "countries" || activeTab === "sizes") && (
                <div className="form-group">
                  <label className="form-label">Código</label>
                  <input
                    className="form-input"
                    value={currentItem.code}
                    onChange={(e) => setCurrentItem({ ...currentItem, code: e.target.value.toUpperCase() })}
                    placeholder="Código"
                  />
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? '⏳ Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">⚠️ Confirmar eliminación</h2>
            <div className="modal-content">¿Estás seguro de eliminar este elemento?</div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmDelete} disabled={loading}>
                {loading ? '⏳ Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}