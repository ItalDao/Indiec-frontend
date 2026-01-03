import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaticPageForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de guardado
    console.log({
      title,
      url,
      content,
      visible,
    });

    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/admin/settings/static-pages");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Crear página estática</h1>
        <p className="page-subtitle">
          Define el contenido estático de tu plataforma
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="form-group">
            <label className="form-label">Título</label>
            <input
              className="form-input"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ej: Sobre INDIEC"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL</label>
            <input
              className="form-input"
              value={url}
              onChange={(e) => setUrl(generateUrl(e.target.value))}
              placeholder="sobre-indiec"
              required
            />
            <small style={{ color: "#94a3b8", fontSize: "13px" }}>
              URL final: /{url || "tu-url"}
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Contenido</label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Escribe el contenido de la página..."
            />
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={visible}
                onChange={() => setVisible(!visible)}
              />
              <span>Publicar página</span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button type="submit" className="btn btn-primary">
              Guardar página
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/settings/static-pages")}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>✔ Página creada</h2>
            <p>La página “{title}” fue creada correctamente.</p>
            <button className="btn btn-primary" onClick={handleConfirm}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
