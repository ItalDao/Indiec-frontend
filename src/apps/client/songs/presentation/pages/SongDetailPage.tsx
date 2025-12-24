import { useParams, Link } from 'react-router-dom';
import { useSong } from '../hooks/useSongs';
import { Button } from '../../../../../shared/ui';
import { colors } from '../../../../../shared/theme/colors';
import { formatStreams } from '../../domain/models/Song';

export const SongDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { song, loading, error, handlePlay } = useSong(Number(id));

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.5rem',
        color: colors.textMuted 
      }}>
         Cargando...
      </div>
    );
  }

  if (error || !song) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem',
        color: colors.error 
      }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}> </p>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Canción no encontrada</h2>
        <Link to="/client/songs">
          <Button variant="primary">← Volver al catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to="/client/songs" 
          style={{ 
            color: colors.textSecondary, 
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'color 0.2s'
          }}
        >
          ← Volver al catálogo
        </Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
        gap: '3rem',
      }}>
        <div>
          <div 
            style={{
              background: colors.backgroundCard,
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              padding: 0, 
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                background: song.imagen 
                  ? `url(${song.imagen})` 
                  : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem',
              }}
            >
              {!song.imagen && 'm'}
            </div>
          </div>

          <div 
            style={{
              marginTop: '1rem',
              background: colors.backgroundCard,
              borderRadius: '12px',
              padding: '1.5rem',
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around',
              textAlign: 'center'
            }}>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.primary }}>
                  {formatStreams(song.streams)}
                </p>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted }}>Reproducciones</p>
              </div>
              <div style={{ borderLeft: `1px solid ${colors.border}`, paddingLeft: '1rem' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: colors.secondary }}>
                  {song.año}
                </p>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted }}>Año</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800',
              marginBottom: '1rem',
              color: colors.text 
            }}
          >
            {song.titulo}
          </h1>

          <p style={{ 
            fontSize: '1.25rem', 
            color: colors.textSecondary,
            marginBottom: '2rem'
          }}>
            Por <span style={{ color: colors.primary, fontWeight: '600' }}>{song.artista}</span>
          </p>

          <div 
            style={{
              background: colors.backgroundCard,
              borderRadius: '12px',
              padding: '1.5rem',
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={{ display: 'grid', gap: '1rem' }}>
              <InfoRow label="Álbum" value={song.album} />
              <InfoRow label="Duración" value={song.duracion} />
              <InfoRow label="Género" value={song.genero || 'No especificado'} />
            </div>
          </div>

          <div style={{ 
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Button 
              variant="primary" 
              size="lg"
              onClick={handlePlay}
              style={{ flex: 1, minWidth: '200px' }}
            >
               Reproducir
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              style={{ flex: 1, minWidth: '200px' }}
            >
               Agregar a Favoritos
            </Button>
          </div>

          <p style={{ 
            marginTop: '2rem',
            padding: '1rem',
            background: `${colors.info}15`,
            borderLeft: `4px solid ${colors.info}`,
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: colors.textSecondary
          }}>
             <strong>Nota:</strong> Apoya a los artistas independientes compartiendo su música
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between',
    paddingBottom: '0.75rem',
    borderBottom: `1px solid ${colors.border}`
  }}>
    <span style={{ color: colors.textMuted, fontSize: '0.875rem' }}>{label}</span>
    <span style={{ color: colors.text, fontWeight: '500' }}>{value}</span>
  </div>
);