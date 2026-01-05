// src/apps/client/settings/presentation/pages/UserSettingsPage.tsx
import { useState } from 'react';
import { colors } from '../../../../../shared/theme/colors';

interface UserPreferences {
  language: string;
  favoriteGenres: string[];
  notifications: {
    newReleases: boolean;
    events: boolean;
    offers: boolean;
  };
  privacy: {
    profileVisible: boolean;
    shareListeningHistory: boolean;
  };
}

const AVAILABLE_GENRES = [
  'Indie Rock',
  'Alternative Rock',
  'Psychedelic Rock',
  'Indie Pop',
  'Electronic',
  'Folk',
  'Punk',
  'Experimental'
];

const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'es',
  favoriteGenres: [],
  notifications: {
    newReleases: true,
    events: true,
    offers: false
  },
  privacy: {
    profileVisible: true,
    shareListeningHistory: false
  }
};

export const UserSettingsPage = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('user_preferences');
    return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  });

  const [saved, setSaved] = useState(false);





  const handleSave = () => {
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleGenre = (genre: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleDeleteAccount = () => {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      localStorage.clear();
      alert('Cuenta eliminada. Serás redirigido al inicio.');
      window.location.href = '/client/home';
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
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
            Configuración
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Personaliza tu experiencia en INDIEC
          </p>
        </div>

        {saved && (
          <div style={{
            padding: '16px 20px',
            marginBottom: '30px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '12px',
            color: '#22c55e',
            fontSize: '16px',
            fontWeight: '500',
          }}>
            ✓ Configuración guardada correctamente
          </div>
        )}

        <div style={{ display: 'grid', gap: '30px' }}>
          {/* Idioma */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#fff', margin: 0 }}>
              Idioma
            </h2>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({...preferences, language: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '10px',
                color: '#fff',
                outline: 'none',
                cursor: 'pointer',
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
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>

          {/* Géneros favoritos */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#fff', margin: 0 }}>
              Géneros Favoritos
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px', margin: '0 0 20px 0' }}>
              Selecciona tus géneros favoritos para recibir recomendaciones personalizadas
            </p>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '12px' 
            }}>
              {AVAILABLE_GENRES.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: preferences.favoriteGenres.includes(genre)
                      ? '1px solid #8b5cf6'
                      : '1px solid rgba(139, 92, 246, 0.3)',
                    background: preferences.favoriteGenres.includes(genre)
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.2))'
                      : 'rgba(30, 27, 75, 0.5)',
                    color: preferences.favoriteGenres.includes(genre)
                      ? '#8b5cf6'
                      : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                  onMouseEnter={(e) => {
                    if (!preferences.favoriteGenres.includes(genre)) {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!preferences.favoriteGenres.includes(genre)) {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                    }
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Notificaciones */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#fff', margin: 0 }}>
              Notificaciones
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.notifications.newReleases}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: {...preferences.notifications, newReleases: e.target.checked}
                  })}
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    marginTop: '4px',
                    accentColor: '#8b5cf6'
                  }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>Nuevos lanzamientos</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                    Notificaciones cuando tus artistas favoritos suben música nueva
                  </div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.notifications.events}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: {...preferences.notifications, events: e.target.checked}
                  })}
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    marginTop: '4px',
                    accentColor: '#8b5cf6'
                  }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>Eventos próximos</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                    Avisos sobre conciertos y eventos cercanos
                  </div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.notifications.offers}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: {...preferences.notifications, offers: e.target.checked}
                  })}
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    marginTop: '4px',
                    accentColor: '#8b5cf6'
                  }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>Ofertas y promociones</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                    Descuentos en merchandising y boletos
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Privacidad */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#fff', margin: 0 }}>
              Privacidad
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.privacy.profileVisible}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    privacy: {...preferences.privacy, profileVisible: e.target.checked}
                  })}
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    marginTop: '4px',
                    accentColor: '#8b5cf6'
                  }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>Perfil visible</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                    Permite que otros usuarios vean tu perfil público
                  </div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.privacy.shareListeningHistory}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    privacy: {...preferences.privacy, shareListeningHistory: e.target.checked}
                  })}
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    marginTop: '4px',
                    accentColor: '#8b5cf6'
                  }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>Compartir historial</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                    Comparte tu historial de reproducción para mejores recomendaciones
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Botón de guardar */}
          <button
            onClick={handleSave}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
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
            Guardar Cambios
          </button>

          {/* Zona peligrosa */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#ef4444', margin: 0 }}>
              Zona Peligrosa
            </h2>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '20px' }}>
              Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
            </p>
            <button
              onClick={handleDeleteAccount}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: '#ef4444',
                border: '1px solid #ef4444',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};