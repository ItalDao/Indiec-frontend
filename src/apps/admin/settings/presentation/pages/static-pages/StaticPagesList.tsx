import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PaginaEstatica {
  id: string;
  titulo: string;
  slug: string;
  visible: boolean;
}

const mockPages: PaginaEstatica[] = [
  { id: "1", titulo: "Sobre INDIEC", slug: "sobre-indiec", visible: true },
  { id: "2", titulo: "Términos y Condiciones", slug: "terminos-condiciones", visible: true },
  { id: "3", titulo: "Política de Privacidad", slug: "politica-privacidad", visible: false },
];

export default function StaticPagesList() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PaginaEstatica[]>(mockPages);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  const toggleVisibility = (id: string) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === id ? { ...page, visible: !page.visible } : page
      )
    );
  };

  const handleDelete = (id: string) => {
    setPageToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      setPages((prev) => prev.filter((page) => page.id !== pageToDelete));
      setShowDeleteModal(false);
      setPageToDelete(null);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Páginas Estáticas</h1>
            <p className="page-subtitle">Gestiona el contenido estático de tu plataforma</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/settings/static-pages/new")}
          >
            ➕ Nueva página
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Slug</th>
              <th style={{ textAlign: 'center' }}>Estado</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td style={{ fontWeight: '500' }}>{page.titulo}</td>
                <td style={{ color: '#94a3b8', fontSize: '14px' }}>/{page.slug}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={page.visible ? 'badge badge-success' : 'badge badge-danger'}>
                    {page.visible ? '👁️ Visible' : '🚫 Oculto'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons" style={{ justifyContent: 'center' }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => navigate(`/admin/settings/static-pages/edit/${page.id}`)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => toggleVisibility(page.id)}
                    >
                      {page.visible ? '👁️ Ocultar' : '👁️ Mostrar'}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(page.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">⚠️ Confirmar eliminación</h2>
            <div className="modal-content">
              ¿Estás seguro de eliminar esta página? Esta acción no se puede deshacer.
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}