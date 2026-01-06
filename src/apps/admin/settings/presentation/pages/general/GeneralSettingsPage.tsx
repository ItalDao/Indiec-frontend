import { useState, useEffect } from "react";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { Icons } from "../../../../../client/songs/presentation/components/Icons";

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
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            <Icons.Settings />
          </div>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Cargando configuración...</p>
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
        padding: '2rem',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <Icons.AlertCircle />
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
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: 'clamp(42px, 7vw, 64px)', 
            fontWeight: '900',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-2px',
          }}>
            Configuración General
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Administra la información básica de la plataforma
          </p>
        </div>

        <form onSubmit={handleSave}>
          {/* INFORMACIÓN DE PLATAFORMA */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6)), linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            marginBottom: '24px',
            transition: 'all 0.3s ease',
          }}>
            <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '600', color: '#e2e8f0' }}>Información de la Plataforma</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Nombre de la plataforma</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  placeholder="Ej: INDIEC"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Texto del footer</label>
                <input
                  type="text"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="Texto del pie de página"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>
            </div>

            {/* LOGO */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>Logo de la plataforma</label>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {logo ? (
                  <div style={{ position: 'relative', flexShrink: 0 }}>
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
                      flexShrink: 0,
                    }}>
                    <Icons.FileText />
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
                  <label htmlFor="logo-upload" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'rgba(100, 116, 139, 0.3)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(100, 116, 139, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  }}>
                    <Icons.Plus />
                    {logo ? 'Cambiar logo' : 'Subir logo'}
                  </label>
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '8px' }}>
                    Formatos: JPG, PNG, SVG (Max 2MB)
                  </p>
                </div>
              </div>
            </div>

            {/* COLORES */}
            <h3 style={{ margin: '32px 0 24px', fontSize: '20px', fontWeight: '600', color: '#e2e8f0' }}>Colores de Marca</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Color principal</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    style={{
                      width: '60px',
                      height: '60px',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{primaryColor}</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>Código HEX</span>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Color secundario</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    style={{
                      width: '60px',
                      height: '60px',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{secondaryColor}</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>Código HEX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* REDES SOCIALES */}
            <h3 style={{ margin: '32px 0 24px', fontSize: '20px', fontWeight: '600', color: '#e2e8f0' }}>Redes Sociales</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Instagram</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@usuario"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Facebook</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="facebook.com/..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Twitter/X</label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@usuario"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>
            </div>

            {/* BOTONES */}
            <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                }}
              >
                {loading ? (
                  <>
                    ⏳ Guardando...
                  </>
                ) : (
                  <>
                    <Icons.Settings />
                    Guardar configuración
                  </>
                )}
              </button>
              <button 
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: '#cbd5e1',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.color = '#8b5cf6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                <Icons.X />
                Cancelar
              </button>
            </div>
          </div>
        </form>

        {/* MODAL ÉXITO */}
        {showModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.95), rgba(45, 27, 105, 0.7))',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              padding: '40px',
              maxWidth: '400px',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: '48px', marginBottom: '16px', color: '#22c55e' }}>
                <Icons.Check />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#e2e8f0', marginBottom: '8px' }}>¡Éxito!</h2>
              <p style={{ color: '#cbd5e1', marginBottom: '24px' }}>
                Configuración guardada exitosamente.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
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