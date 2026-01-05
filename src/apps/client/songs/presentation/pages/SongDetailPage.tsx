// src/apps/client/songs/presentation/pages/SongDetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useSong } from '../hooks/useSongs';
import { colors } from '../../../../../shared/theme/colors';
import { formatStreams } from '../../domain/models/Song';
import { AudioPlayer } from '../components/AudioPlayer';
import { Icons } from '../components/Icons';


export const SongDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { song, loading, error, handlePlay, isFavorite, toggleFavorite } = useSong(Number(id));


  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        gap: '20px',
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: `3px solid rgba(139, 92, 246, 0.2)`,
          borderTop: `3px solid ${colors.primary}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{
          fontSize: '15px',
          color: '#cbd5e1',
          fontWeight: '500',
        }}>
          Cargando...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !song) {
    return (
      <div style={{ 
        maxWidth: '500px',
        margin: '60px auto',
        textAlign: 'center', 
        padding: '48px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
        borderRadius: '16px',
        border: `1px solid rgba(239, 68, 68, 0.3)`,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', color: colors.error, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.AlertCircle /></div>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#fff', fontWeight: '700', margin: 0 }}>Canción no encontrada</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '24px', margin: '12px 0 24px 0' }}>No pudimos encontrar la canción que buscas.</p>
        <Link to="/client/songs">
          <button
            style={{
              padding: '12px 28px',
              background: colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              boxShadow: `0 4px 12px ${colors.primary}40`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${colors.primary}40`;
            }}
          >
            Volver al catálogo
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Back button */}
        <Link 
          to="/client/songs" 
          style={{ 
            color: colors.primary, 
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '700',
            transition: 'color 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '40px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.secondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.primary;
          }}
        >
          <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.ChevronLeft />
          </div>
          ← Volver
        </Link>

        {/* Main grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth > 768 ? '360px 1fr' : '1fr',
        gap: '48px',
        alignItems: 'start',
      }}>
        {/* Left - Album cover and stats */}
        <div>
          {/* Album cover */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: `1px solid rgba(139, 92, 246, 0.3)`,
              padding: 0, 
              overflow: 'hidden',
              boxShadow: `0 12px 32px ${colors.primary}25, inset 0 1px 0 rgba(255,255,255,0.1)`,
              marginBottom: '32px',
              aspectRatio: '1',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: song.imagen 
                  ? `url(${song.imagen})` 
                  : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                color: 'white',
              }}
            >
              {!song.imagen && <Icons.Music />}
            </div>
          </div>

          {/* Stats */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(45, 27, 105, 0.4))',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: `1px solid rgba(139, 92, 246, 0.3)`,
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              {/* Streams */}
              <div style={{
                padding: '20px',
                background: `linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))`,
                border: `1px solid rgba(139, 92, 246, 0.3)`,
                borderRadius: '12px',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ width: '36px', height: '36px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary }}>
                  <Icons.Zap />
                </div>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>
                  {formatStreams(song.streams)}
                </p>
                <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '8px 0 0 0', fontWeight: '500' }}>Reproducciones</p>
              </div>
              
              {/* Year */}
              <div style={{
                padding: '20px',
                background: `linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05))`,
                border: `1px solid rgba(99, 102, 241, 0.3)`,
                borderRadius: '12px',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ width: '36px', height: '36px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.secondary }}>
                  <Icons.Disc />
                </div>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>
                  {song.año}
                </p>
                <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '8px 0 0 0', fontWeight: '500' }}>Año</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Song info and player */}
        <div>
          {/* Title and artist */}
          <div style={{ marginBottom: '36px' }}>
            <h1 
              style={{ 
                fontSize: 'clamp(32px, 6vw, 52px)', 
                fontWeight: '900',
                marginBottom: '12px',
                color: '#fff',
                margin: 0,
                lineHeight: '1.1',
                letterSpacing: '-1px',
              }}
            >
              {song.titulo}
            </h1>

            <p style={{ 
              fontSize: '18px', 
              color: '#cbd5e1',
              margin: 0,
              fontWeight: '500',
            }}>
              por <span style={{ color: colors.primary, fontWeight: '700' }}>{song.artista}</span>
            </p>
          </div>

          {/* Info section */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(45, 27, 105, 0.4))',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: `1px solid rgba(139, 92, 246, 0.3)`,
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ display: 'grid', gap: '20px' }}>
              <InfoRow 
                icon={<Icons.Disc />} 
                label="Álbum" 
                value={song.album} 
              />
              <InfoRow 
                icon={<Icons.Clock />} 
                label="Duración" 
                value={song.duracion} 
              />
              <InfoRow 
                icon={<Icons.Music />} 
                label="Género" 
                value={song.genero || 'No especificado'} 
              />
            </div>
          </div>

          {/* Audio player */}
          <div style={{ marginBottom: '32px' }}>
            <AudioPlayer 
              audioUrl={song.linkAudio} 
              songTitle={song.titulo}
              onPlay={handlePlay}
            />
          </div>

          {/* Action buttons */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <button 
              onClick={handlePlay}
              style={{ 
                padding: '14px 24px', 
                fontSize: '15px', 
                fontWeight: '700',
                background: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                boxShadow: `0 4px 12px ${colors.primary}20`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${colors.primary}20`;
              }}
            >
              <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.Play />
              </div>
              <span>Reproducir</span>
            </button>
            <button 
              onClick={toggleFavorite}
              style={{ 
                padding: '14px 24px', 
                fontSize: '15px', 
                fontWeight: '700',
                background: isFavorite ? colors.primary : 'transparent',
                color: isFavorite ? '#fff' : colors.primary,
                border: `2px solid ${colors.primary}`,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                boxShadow: isFavorite ? `0 4px 12px ${colors.primary}20` : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}40`;
                e.currentTarget.style.background = colors.primary;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isFavorite ? `0 4px 12px ${colors.primary}20` : 'none';
                e.currentTarget.style.background = isFavorite ? colors.primary : 'transparent';
                e.currentTarget.style.color = isFavorite ? '#fff' : colors.primary;
              }}
            >
              <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isFavorite ? <Icons.HeartFilled /> : <Icons.Heart />}
              </div>
              <span>{isFavorite ? 'Favorito' : 'Favorito'}</span>
            </button>
          </div>

          {/* Info banner */}
          <div style={{ 
            padding: '20px',
            background: `linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))`,
            borderLeft: `4px solid ${colors.info}`,
            border: `1px solid rgba(34, 197, 94, 0.3)`,
            borderRadius: '12px',
            fontSize: '14px',
            color: '#cbd5e1',
            lineHeight: '1.6',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#22c55e',
              flexShrink: 0,
              marginTop: '2px',
            }}>
              <Icons.Heart />
            </div>
            <p style={{ margin: 0, fontWeight: '600' }}>
              Apoya a los artistas independientes compartiendo su música. Cada reproducción cuenta.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    borderBottom: `1px solid ${colors.border}`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
      <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ color: colors.textMuted, fontSize: '14px', fontWeight: '500' }}>{label}</span>
    </div>
    <span style={{ color: colors.text, fontWeight: '600', fontSize: '14px' }}>{value}</span>
  </div>
);
