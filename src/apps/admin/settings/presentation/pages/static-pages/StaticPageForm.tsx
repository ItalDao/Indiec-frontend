import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStaticPages } from "../../hooks/useStaticPages";
import { Icons } from "../../../../../client/songs/presentation/components/Icons";

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
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 900,
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Crear Página Estática
          </h1>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '16px' }}>
            Define el contenido estático de tu plataforma
          </p>
        </div>

        {/* FORM CARD */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '40px',
            backdropFilter: 'blur(12px)',
          }}>
            {/* TITLE INPUT */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#cbd5e1',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Título de la página
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ej: Sobre INDIEC"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* URL INPUT */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#cbd5e1',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                URL amigable
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(generateUrl(e.target.value))}
                placeholder="sobre-indiec"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  marginBottom: '8px',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <small style={{ color: '#8b5cf6', fontSize: '13px' }}>
                URL final: /paginas/{url || 'tu-url'}
              </small>
            </div>

            {/* META DESCRIPTION */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#cbd5e1',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Meta Descripción (SEO)
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                placeholder="Descripción breve que aparecerá en resultados de búsqueda"
                rows={3}
                maxLength={160}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  marginBottom: '8px',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <small style={{
                color: remainingChars < 20 ? '#fca5a5' : '#8b5cf6',
                fontSize: '13px',
              }}>
                {remainingChars} caracteres restantes
              </small>
            </div>

            {/* CONTENT TEXTAREA */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#cbd5e1',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Contenido
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe el contenido de la página..."
                rows={10}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* VISIBILITY CHECKBOX */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '12px 16px',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '8px',
              }}>
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={() => setVisible(!visible)}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#8b5cf6',
                  }}
                />
                <span style={{ color: '#cbd5e1', fontSize: '16px', fontWeight: '500' }}>
                  Publicar página (visible para usuarios)
                </span>
              </label>
            </div>

            {/* INFO BOX */}
            <div style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '40px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}>
              <Icons.AlertCircle style={{ color: '#8b5cf6', marginTop: '2px', flexShrink: 0 }} />
              <small style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5' }}>
                La fecha de actualización se registrará automáticamente al guardar
              </small>
            </div>

            {/* BUTTONS */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(99, 102, 241, 0.5) 100%)'
                    : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <Icons.Check />
                {loading ? 'Guardando...' : 'Guardar página'}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/settings/static-pages")}
                style={{
                  background: 'transparent',
                  border: '2px solid #64748b',
                  color: '#cbd5e1',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(100, 116, 139, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icons.X />
                Cancelar
              </button>
            </div>
          </div>
        </form>

        {/* SUCCESS MODAL */}
        {showModal && (
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
          }} onClick={() => setShowModal(false)}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '16px',
              padding: '48px',
              maxWidth: '400px',
              width: '90%',
              backdropFilter: 'blur(16px)',
              textAlign: 'center',
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '0 0 16px 0',
                color: '#fff',
              }}>
                ¡Página creada!
              </h2>
              <div style={{
                color: '#cbd5e1',
                fontSize: '16px',
                marginBottom: '32px',
                lineHeight: '1.6',
              }}>
                La página "{title}" ha sido creada exitosamente.
              </div>
              <button
                onClick={handleConfirm}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
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
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}