import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStaticPages } from "../../hooks/useStaticPages";
import { Icons } from "../../../../../client/songs/presentation/components/Icons";

export default function StaticPagesList() {
  const navigate = useNavigate();
  const { pages, loading, error, deletePage, toggleVisibility } = useStaticPages();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPageToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (pageToDelete) {
      await deletePage(pageToDelete);
      setShowDeleteModal(false);
      setPageToDelete(null);
    }
  };

  if (loading && pages.length === 0) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        padding: '40px 20px',
      }}>
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <p style={{ color: '#94a3b8' }}>Cargando páginas...</p>
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
        padding: '40px 20px',
      }}>
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '24px',
        }}>
          <p style={{ color: '#fca5a5' }}>❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(42px, 7vw, 64px)',
                fontWeight: 900,
                margin: '0 0 8px 0',
                background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Páginas Estáticas
              </h1>
              <p style={{ margin: 0, color: '#cbd5e1', fontSize: '16px' }}>
                Gestiona el contenido estático de tu plataforma
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/settings/static-pages/new")}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icons.Plus />
              Nueva página
            </button>
          </div>
        </div>

        {/* TABLE CARD */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}>
                <th style={{
                  padding: '20px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Título</th>
                <th style={{
                  padding: '20px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>URL</th>
                <th style={{
                  padding: '20px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Última Actualización</th>
                <th style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Estado</th>
                <th style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#cbd5e1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr
                  key={page.id}
                  style={{
                    borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{
                    padding: '20px',
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                    {page.titulo}
                  </td>
                  <td style={{
                    padding: '20px',
                    color: '#94a3b8',
                    fontSize: '14px',
                  }}>
                    /{page.slug}
                  </td>
                  <td style={{
                    padding: '20px',
                    color: '#94a3b8',
                    fontSize: '14px',
                  }}>
                    {new Date(page.fechaActualizacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td style={{
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      background: page.visible
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      color: page.visible ? '#22c55e' : '#ef4444',
                      border: page.visible
                        ? '1px solid rgba(34, 197, 94, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)',
                    }}>
                      {page.visible ? '✓ Visible' : '✗ Oculto'}
                    </span>
                  </td>
                  <td style={{
                    padding: '20px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}>
                      <button
                        onClick={() => navigate(`/admin/settings/static-pages/edit/${page.id}`)}
                        style={{
                          background: 'transparent',
                          border: '2px solid #8b5cf6',
                          color: '#8b5cf6',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Icons.Edit />
                      </button>
                      <button
                        onClick={() => toggleVisibility(page.id)}
                        style={{
                          background: 'transparent',
                          border: '2px solid #3b82f6',
                          color: '#3b82f6',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Icons.Eye />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        style={{
                          background: 'transparent',
                          border: '2px solid #ef4444',
                          color: '#ef4444',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
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

        {showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }} onClick={() => setShowDeleteModal(false)}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '16px',
              padding: '48px',
              maxWidth: '400px',
              width: '90%',
              backdropFilter: 'blur(16px)',
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '0 0 16px 0',
                color: '#fff',
              }}>
                ⚠️ Confirmar eliminación
              </h2>
              <div style={{
                color: '#cbd5e1',
                fontSize: '16px',
                marginBottom: '32px',
                lineHeight: '1.6',
              }}>
                ¿Estás seguro de eliminar esta página? Esta acción no se puede deshacer.
              </div>
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    background: 'transparent',
                    border: '2px solid #64748b',
                    color: '#cbd5e1',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 116, 139, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}