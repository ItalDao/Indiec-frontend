import { useState } from "react";

interface CatalogItem {
  id: string;
  name: string;
  code?: string;
}

const mockGenres: CatalogItem[] = [
  { id: "1", name: "Rock", code: "ROCK" },
  { id: "2", name: "Pop", code: "POP" },
  { id: "3", name: "Jazz", code: "JAZZ" },
];

const mockCountries: CatalogItem[] = [
  { id: "1", name: "Ecuador", code: "EC" },
  { id: "2", name: "Colombia", code: "CO" },
  { id: "3", name: "Perú", code: "PE" },
];

const mockCategories: CatalogItem[] = [
  { id: "1", name: "Camisetas" },
  { id: "2", name: "Accesorios" },
  { id: "3", name: "Vinilos" },
];

const mockSizes: CatalogItem[] = [
  { id: "1", name: "S", code: "S" },
  { id: "2", name: "M", code: "M" },
  { id: "3", name: "L", code: "L" },
  { id: "4", name: "XL", code: "XL" },
];

export default function CatalogsList() {
  const [activeTab, setActiveTab] = useState<"genres" | "countries" | "categories" | "sizes">("genres");
  const [genres, setGenres] = useState(mockGenres);
  const [countries, setCountries] = useState(mockCountries);
  const [categories, setCategories] = useState(mockCategories);
  const [sizes, setSizes] = useState(mockSizes);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [currentItem, setCurrentItem] = useState({ id: "", name: "", code: "" });

  const getCurrentData = () => {
    switch (activeTab) {
      case "genres": return genres;
      case "countries": return countries;
      case "categories": return categories;
      case "sizes": return sizes;
    }
  };

  const handleAdd = () => {
    setCurrentItem({ id: "", name: "", code: "" });
    setModalType("add");
    setShowModal(true);
  };

  const handleEdit = (item: CatalogItem) => {
    setCurrentItem({ id: item.id, name: item.name, code: item.code || "" });
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = (item: CatalogItem) => {
    setCurrentItem({ id: item.id, name: item.name, code: item.code || "" });
    setModalType("delete");
    setShowModal(true);
  };

  const handleSave = () => {
    const updateData = (data: CatalogItem[]) => {
      if (modalType === "add") {
        return [...data, { ...currentItem, id: Date.now().toString() }];
      }
      if (modalType === "edit") {
        return data.map(item => item.id === currentItem.id ? currentItem : item);
      }
      if (modalType === "delete") {
        return data.filter(item => item.id !== currentItem.id);
      }
      return data;
    };

    switch (activeTab) {
      case "genres": setGenres(updateData(genres)); break;
      case "countries": setCountries(updateData(countries)); break;
      case "categories": setCategories(updateData(categories)); break;
      case "sizes": setSizes(updateData(sizes)); break;
    }
    setShowModal(false);
  };

  const tabs = [
    { id: "genres", label: "🎵 Géneros Musicales" },
    { id: "countries", label: "🌍 Países" },
    { id: "categories", label: "📦 Categorías" },
    { id: "sizes", label: "📏 Tallas" },
  ];

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
            onClick={() => setActiveTab(tab.id as any)}
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
              {getCurrentData().map((item) => (
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
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item)}>
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
              {modalType === "delete" ? "⚠️ Confirmar eliminación" : modalType === "add" ? "➕ Agregar item" : "✏️ Editar item"}
            </h2>
            <div className="modal-content">
              {modalType === "delete" ? (
                <p>¿Estás seguro de eliminar "{currentItem.name}"?</p>
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button
                className={`btn ${modalType === "delete" ? "btn-danger" : "btn-primary"}`}
                onClick={handleSave}
              >
                {modalType === "delete" ? "Eliminar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}