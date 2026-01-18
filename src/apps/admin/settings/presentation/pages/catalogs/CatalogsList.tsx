import { useState } from "react";
import { useCatalogs } from "../../hooks/useCatalogs";
import { Icons } from "../../../../../client/songs/presentation/components/Icons";
import { useAlert } from "../../../../../../shared/hooks/useAlert";
import { AlertContainer } from "../../../../../../shared/ui/AlertContainer";
import type { CatalogType } from "../../../domain/entities/Catalog";

export default function CatalogsList() {
  const [activeTab, setActiveTab] = useState<CatalogType>("genres");
  const { items, loading, error, createItem, updateItem, deleteItem } = useCatalogs(activeTab);
  const { alerts, removeAlert, success, error: errorAlert, warning, info } = useAlert();
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
    warning('¿Eliminar elemento?', 'Esta acción no se puede deshacer. El elemento será eliminado permanentemente.');
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteItem(itemToDelete);
      success('Eliminado', 'Elemento eliminado correctamente');
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    info('Cancelado', 'Eliminación cancelada');
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleSave = async () => {
    if (!currentItem.name?.trim() || !currentItem.code?.trim()) {
      errorAlert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    if (modalType === "add") {
      const { id, ...itemData } = currentItem;
      await createItem(itemData);
      success('Creado', 'Elemento creado correctamente');
    } else if (modalType === "edit") {
      await updateItem(currentItem);
      success('Actualizado', 'Elemento actualizado correctamente');
    }
    setShowModal(false);
  };

  const tabs = [
    { id: "genres", label: "Géneros Musicales", icon: <Icons.Music2 /> },
    { id: "countries", label: "Países", icon: <Icons.MapPin /> },
    { id: "categories", label: "Categorías", icon: <Icons.Layers /> },
    { id: "sizes", label: "Tallas", icon: <Icons.BarChart3 /> },
  ];

  if (loading && items.length === 0) {
    return (
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px', color: '#8b5cf6' }}>
            <Icons.Layers />
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '18px' }}>Cargando catálogos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        padding: '60px 2rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', border: '1px solid', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
            <Icons.AlertCircle style={{ color: '#fca5a5' }} />
            <p style={{ color: '#fca5a5', margin: 0 }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <AlertContainer alerts={alerts} onRemove={removeAlert} />
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
            Catálogos Maestros
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: 0,
          }}>
            Gestiona los catálogos del sistema
          </p>
        </div>

        {/* TABS */}
        <div style={{ marginBottom: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CatalogType)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : 'transparent',
                border: activeTab === tab.id
                  ? 'none'
                  : '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* CARD */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          padding: '32px',
          backdropFilter: 'blur(16px)',
        }}>
          {/* CARD HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              margin: 0,
              color: '#fff',
            }}>
              {tabs.find(t => t.id === activeTab)?.icon}
              {tabs.find(t => t.id === activeTab)?.label}
            </h3>
            <button 
              onClick={handleAdd}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icons.Plus />
              Agregar
            </button>
          </div>

          {/* TABLE */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(139, 92, 246, 0.2)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Nombre</th>
                  {(activeTab === "genres" || activeTab === "countries" || activeTab === "sizes") && (
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Código</th>
                  )}
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ 
                    borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                    transition: 'background-color 0.2s ease',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '16px', fontWeight: '500', color: '#fff' }}>{item.name}</td>
                    {(activeTab === "genres" || activeTab === "countries" || activeTab === "sizes") && (
                      <td style={{ padding: '16px', color: '#cbd5e1' }}>{item.code}</td>
                    )}
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleEdit(item)}
                          style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '6px',
                            color: '#8b5cf6',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                          }}
                        >
                          <Icons.Edit />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '6px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                          }}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}
          onClick={() => setShowModal(false)}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '48px',
            maxWidth: '500px',
            width: '90%',
            backdropFilter: 'blur(16px)',
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              {modalType === "add" ? <Icons.Plus /> : <Icons.Edit />}
              {modalType === "add" ? "Agregar item" : "Editar item"}
            </h2>
            <p style={{ margin: '0 0 32px 0', fontSize: '14px', color: '#cbd5e1' }}>
              {modalType === "add" ? "Agrega un nuevo elemento" : "Actualiza el elemento"}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Nombre</label>
                <input
                  type="text"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  placeholder="Nombre"
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.8)',
                    border: '2px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              {(activeTab === "genres" || activeTab === "countries" || activeTab === "sizes") && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Código</label>
                  <input
                    type="text"
                    value={currentItem.code}
                    onChange={(e) => setCurrentItem({ ...currentItem, code: e.target.value.toUpperCase() })}
                    placeholder="Código"
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(30, 27, 75, 0.8)',
                      border: '2px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '2px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  color: '#cbd5e1',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: loading ? 'rgba(139, 92, 246, 0.3)' : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? '⏳ Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '48px',
            maxWidth: '500px',
            width: '90%',
            backdropFilter: 'blur(16px)',
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <Icons.AlertCircle />
              Confirmar eliminación
            </h2>
            <p style={{ margin: '0 0 32px 0', fontSize: '14px', color: '#cbd5e1' }}>
              ¿Estás seguro de eliminar este elemento?
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={cancelDelete}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '2px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  color: '#cbd5e1',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: loading ? 'rgba(239, 68, 68, 0.3)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(239, 68, 68, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? '⏳ Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}