import { useState } from "react";

export default function GeneralSettingsPage() {
  const [platformName, setPlatformName] = useState("INDIEC");
  const [primaryColor, setPrimaryColor] = useState("#8B5CF6");
  const [secondaryColor, setSecondaryColor] = useState("#06b6d4");
  const [instagram, setInstagram] = useState("@indiec_oficial");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [footerText, setFooterText] = useState("© 2025 INDIEC. Todos los derechos reservados.");
  const [logo, setLogo] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      platformName,
      primaryColor,
      secondaryColor,
      instagram,
      facebook,
      twitter,
      footerText,
      logo,
    });
    setShowModal(true);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Configuración General</h1>
        <p className="page-subtitle">Administra la información básica de la plataforma</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="card">
          <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '600' }}>Información de la Plataforma</h3>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Nombre de la plataforma</label>
              <input
                className="form-input"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                placeholder="Ej: INDIEC"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Texto del footer</label>
              <input
                className="form-input"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="Texto del pie de página"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Logo de la plataforma</label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {logo ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={logo}
                    alt="Logo preview"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'contain',
                      background: 'rgba(139, 92, 246, 0.1)',
                      borderRadius: '12px',
                      padding: '8px',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '2px dashed rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                  }}
                >
                  🖼️
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: 'none' }}
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                  📤 {logo ? 'Cambiar logo' : 'Subir logo'}
                </label>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '8px' }}>
                  Formatos: JPG, PNG, SVG (Max 2MB)
                </p>
              </div>
            </div>
          </div>

          <h3 style={{ margin: '32px 0 24px', fontSize: '20px', fontWeight: '600' }}>Colores de Marca</h3>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Color principal</label>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
                <div className="color-preview" style={{ background: primaryColor }}></div>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>{primaryColor}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Color secundario</label>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
                <div className="color-preview" style={{ background: secondaryColor }}></div>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>{secondaryColor}</span>
              </div>
            </div>
          </div>

          <h3 style={{ margin: '32px 0 24px', fontSize: '20px', fontWeight: '600' }}>Redes Sociales</h3>
          
          <div className="grid grid-3">
            <div className="form-group">
              <label className="form-label">Instagram</label>
              <input
                className="form-input"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@usuario"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Facebook</label>
              <input
                className="form-input"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="facebook.com/..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Twitter/X</label>
              <input
                className="form-input"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="@usuario"
              />
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary">
              💾 Guardar configuración
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              ↻ Cancelar
            </button>
          </div>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">✅ ¡Éxito!</h2>
            <div className="modal-content">
              Configuración guardada exitosamente.
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}