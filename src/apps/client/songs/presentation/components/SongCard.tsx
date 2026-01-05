// src/apps/client/songs/presentation/components/SongCard.tsx
import { Link } from 'react-router-dom';
import { colors } from '../../../../../shared/theme/colors';
import type { Song } from '../../domain/models/Song';
import { formatStreams } from '../../domain/models/Song';
import { useState } from 'react';
import { Icons } from './Icons';

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/client/songs/${song.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: `1px solid ${isHovered ? colors.primary : 'rgba(139, 92, 246, 0.2)'}`,
          boxShadow: isHovered 
            ? `0 20px 40px ${colors.primary}30, inset 0 1px 0 rgba(255,255,255,0.1)` 
            : `0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen container */}
        <div
          style={{
            width: '100%',
            paddingBottom: '100%',
            position: 'relative',
            background: song.imagen 
              ? `url(${song.imagen})` 
              : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Play button overlay on hover */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.2s ease-in',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  animation: 'popIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 12px 24px ${colors.primary}60`,
                }}
              >
                <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icons.Play />
                </div>
              </div>
            </div>
          )}

          {/* Genero badge */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: `rgba(139, 92, 246, ${isHovered ? 0.95 : 0.8})`,
              color: '#fff',
              padding: '8px 14px',
              borderRadius: '24px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 8px 16px ${colors.primary}40`,
              border: `1px solid rgba(255, 255, 255, 0.2)`,
            }}
          >
            {song.genero || 'Música'}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Título */}
          <h3
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#fff',
              margin: 0,
              marginBottom: '8px',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transition: 'color 0.2s ease',
              color: isHovered ? colors.primary : '#fff',
            }}
          >
            {song.titulo}
          </h3>

          {/* Artista */}
          <p
            style={{
              fontSize: '12px',
              color: '#94a3b8',
              margin: 0,
              marginBottom: '12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: '500',
            }}
          >
            {song.artista}
          </p>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Footer info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '11px',
              color: '#64748b',
              paddingTop: '12px',
              borderTop: `1px solid rgba(139, 92, 246, 0.2)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, flexShrink: 0 }}>
                <Icons.Clock />
              </span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song.duracion}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
              <span style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.secondary, flexShrink: 0 }}>
                <Icons.Zap />
              </span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formatStreams(song.streams)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Link>
  );
};