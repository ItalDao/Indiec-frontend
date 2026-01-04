import { useState, useEffect } from "react";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";

export default function GeneralSettingsPage() {
  const { settings, loading, error, saveSettings } = useGeneralSettings();
  const [showModal, setShowModal] = useState(false);

  // Estados locales del formulario
  const [platformName, setPlatformName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [footerText, setFooterText] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  // Cargar datos cuando settings cambie
  useEffect(() => {
    if (settings) {
      setPlatformName(settings.platformName);
      setPrimaryColor(settings.primaryColor);
      setSecondaryColor(settings.secondaryColor);
      setInstagram(settings.instagram);
      setFacebook(settings.facebook);
      setTwitter(settings.twitter);
      setFooterText(settings.footerText);
      setLogo(settings.logo);
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await saveSettings({
      id: settings?.id || '1',
      platformName,
      primaryColor,
      secondaryColor,
      instagram,
      facebook,
      twitter,
      footerText,
      logo,
    });

    if (success) {
      setShowModal(true);
    }
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

  if (loading && !settings) {
    return (
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚙️</div>
          <p style={{ color: '#94a3b8' }}>Cargando configuración...</p>
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Guardando...' : '💾 Guardar configuración'}
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