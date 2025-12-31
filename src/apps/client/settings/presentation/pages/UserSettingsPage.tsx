// src/apps/client/settings/presentation/pages/UserSettingsPage.tsx
import { useState } from 'react';
import { Button,  Card } from '../../../../../shared/ui';
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
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800',
        marginBottom: '0.5rem',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Configuración
      </h1>
      <p style={{ color: colors.textMuted, marginBottom: '2rem' }}>
        Personaliza tu experiencia en INDIEC
      </p>

      {saved && (
        <div style={{
          padding: '1rem',
          marginBottom: '2rem',
          background: `${colors.success}20`,
          border: `1px solid ${colors.success}`,
          borderRadius: '8px',
          color: colors.success
        }}>
          ✓ Configuración guardada correctamente
        </div>
      )}

      {/* Idioma */}
      <Card style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: colors.text }}>
           Idioma
        </h2>
        <select
          value={preferences.language}
          onChange={(e) => setPreferences({...preferences, language: e.target.value})}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            background: colors.backgroundLight,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            color: colors.text,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </Card>

      {/* Géneros favoritos */}
      <Card style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: colors.text }}>
           Géneros Favoritos
        </h2>
        <p style={{ fontSize: '0.875rem', color: colors.textMuted, marginBottom: '1rem' }}>
          Selecciona tus géneros favoritos para recibir recomendaciones personalizadas
        </p>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.75rem' 
        }}>
          {AVAILABLE_GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: 'none',
                background: preferences.favoriteGenres.includes(genre)
                  ? colors.primary
                  : colors.backgroundLight,
                color: preferences.favoriteGenres.includes(genre)
                  ? colors.text
                  : colors.textSecondary,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.875rem'
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </Card>

      {/* Notificaciones */}
      <Card style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: colors.text }}>
           Notificaciones
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={preferences.notifications.newReleases}
              onChange={(e) => setPreferences({
                ...preferences,
                notifications: {...preferences.notifications, newReleases: e.target.checked}
              })}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ color: colors.text, fontWeight: '500' }}>Nuevos lanzamientos</div>
              <div style={{ fontSize: '0.875rem', color: colors.textMuted }}>
                Notificaciones cuando tus artistas favoritos suben música nueva
              </div>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={preferences.notifications.events}
              onChange={(e) => setPreferences({
                ...preferences,
                notifications: {...preferences.notifications, events: e.target.checked}
              })}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ color: colors.text, fontWeight: '500' }}>Eventos próximos</div>
              <div style={{ fontSize: '0.875rem', color: colors.textMuted }}>
                Avisos sobre conciertos y eventos cercanos
              </div>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={preferences.notifications.offers}
              onChange={(e) => setPreferences({
                ...preferences,
                notifications: {...preferences.notifications, offers: e.target.checked}
              })}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ color: colors.text, fontWeight: '500' }}>Ofertas y promociones</div>
              <div style={{ fontSize: '0.875rem', color: colors.textMuted }}>
                Descuentos en merchandising y boletos
              </div>
            </div>
          </label>
        </div>
      </Card>

      {/* Privacidad */}
      <Card style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: colors.text }}>
           Privacidad
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={preferences.privacy.profileVisible}
              onChange={(e) => setPreferences({
                ...preferences,
                privacy: {...preferences.privacy, profileVisible: e.target.checked}
              })}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ color: colors.text, fontWeight: '500' }}>Perfil visible</div>
              <div style={{ fontSize: '0.875rem', color: colors.textMuted }}>
                Permite que otros usuarios vean tu perfil público
              </div>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={preferences.privacy.shareListeningHistory}
              onChange={(e) => setPreferences({
                ...preferences,
                privacy: {...preferences.privacy, shareListeningHistory: e.target.checked}
              })}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ color: colors.text, fontWeight: '500' }}>Compartir historial</div>
              <div style={{ fontSize: '0.875rem', color: colors.textMuted }}>
                Comparte tu historial de reproducción para mejores recomendaciones
              </div>
            </div>
          </label>
        </div>
      </Card>

      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button variant="primary" size="lg" onClick={handleSave}>
          Guardar Cambios
        </Button>
      </div>

      {/* Zona peligrosa */}
      <Card style={{ 
        border: `1px solid ${colors.error}`, 
        background: `${colors.error}10` 
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: colors.error }}>
           Zona Peligrosa
        </h2>
        <p style={{ fontSize: '0.875rem', color: colors.textSecondary, marginBottom: '1rem' }}>
          Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
        </p>
        <Button 
          variant="outline" 
          onClick={handleDeleteAccount}
          style={{ 
            borderColor: colors.error, 
            color: colors.error 
          }}
        >
          Eliminar Cuenta
        </Button>
      </Card>
    </div>
  );
};