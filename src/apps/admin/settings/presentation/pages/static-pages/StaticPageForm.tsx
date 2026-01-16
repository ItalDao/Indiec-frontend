import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStaticPages } from "../../hooks/useStaticPages";

export default function StaticPageForm() {
  const navigate = useNavigate();
  const { createPage, loading } = useStaticPages();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await createPage({
      titulo: title,
      slug: url,
      contenido: content,
      metaDescripcion: metaDescription,
      fechaActualizacion: new Date().toISOString().split('T')[0],
      visible: visible,
    });

    if (success) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/admin/settings/static-pages");
  };

  const generateUrl = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!url) {
      setUrl(generateUrl(value));
    }
  };

  const remainingChars = 160 - metaDescription.length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Crear Página Estática</h1>
        <p className="page-subtitle">Define el contenido estático de tu plataforma</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="form-group">
            <label className="form-label">Título de la página</label>
            <input
              className="form-input"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Sobre INDIEC"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL amigable</label>
            <input
              className="form-input"
              value={url}
              onChange={(e) => setUrl(generateUrl(e.target.value))}
              placeholder="sobre-indiec"
              required
            />
            <small style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px', display: 'block' }}>
              URL final: /paginas/{url || 'tu-url'}
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Meta Descripción (SEO)</label>
            <textarea
              className="form-textarea"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
              placeholder="Descripción breve que aparecerá en resultados de búsqueda (máx. 160 caracteres)"
              rows={3}
              maxLength={160}
            />
            <small style={{ 
              color: remainingChars < 20 ? '#fca5a5' : '#94a3b8', 
              fontSize: '13px', 
              marginTop: '4px', 
              display: 'block' 
            }}>
              {remainingChars} caracteres restantes
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Contenido</label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido de la página..."
              rows={10}
            />
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={visible}
                onChange={() => setVisible(!visible)}
              />
              <span>Publicar página (visible para usuarios)</span>
            </label>
          </div>

          <div style={{ 
            background: 'rgba(139, 92, 246, 0.1)', 
            padding: '12px 16px', 
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <small style={{ color: '#cbd5e1', fontSize: '13px' }}>
              ℹ️ La fecha de actualización se registrará automáticamente al guardar
            </small>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Guardando...' : '💾 Guardar página'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/settings/static-pages")}
            >
              ← Cancelar
            </button>
          </div>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">✅ ¡Página creada!</h2>
            <div className="modal-content">
              La página "{title}" ha sido creada exitosamente.
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleConfirm}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}