// src/apps/client/songs/presentation/components/SongCard.tsx
import { Link } from 'react-router-dom';
import { colors } from '../../../../../shared/theme/colors';
import type { Song } from '../../domain/models/Song';
import { formatStreams } from '../../domain/models/Song';

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  return (
    <Link 
      to={`/client/songs/${song.id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          background: colors.backgroundCard,
          borderRadius: '12px',
          padding: '1.5rem',
          border: `1px solid ${colors.border}`,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = `0 8px 20px rgba(139, 92, 246, 0.3)`;
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div
          style={{
            width: '100%',
            height: '200px',
            background: song.imagen 
              ? `url(${song.imagen})` 
              : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
          }}
        >
          {!song.imagen && 'm'}
        </div>

        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {song.titulo}
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            color: colors.textSecondary,
            marginBottom: '0.75rem',
          }}
        >
          {song.artista}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: colors.textMuted,
          }}
        >
          <span> {song.duracion}</span>
          <span> {formatStreams(song.streams)}</span>
          <span> {song.genero || 'Sin género'}</span>
        </div>

        {song.album && song.album !== 'Single' && (
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.25rem 0.75rem',
              background: `${colors.primary}20`,
              color: colors.primary,
              borderRadius: '12px',
              fontSize: '0.75rem',
              display: 'inline-block',
            }}
          >
             {song.album}
          </div>
        )}
      </div>
    </Link>
  );
};