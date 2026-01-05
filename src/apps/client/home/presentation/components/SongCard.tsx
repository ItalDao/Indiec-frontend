import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../../../../shared/theme/colors';

interface Song {
  id: string;
  titulo: string;
  artista: string;
  album?: string;
  portada?: string;
  duracion?: string;
}

interface SongCardProps {
  song: Song;
  onTogglePlay?: (playing: boolean) => void; // Permite avisar al carrusel
}

const SongCard: React.FC<SongCardProps> = ({ song, onTogglePlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const placeholder = 'https://placehold.co/80x80/1E293B/64748B?text=♪';

  // Manejador del click para las ondas y el estado del carrusel
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    
    // Si existe la función callback, notificamos al padre
    if (onTogglePlay) {
      onTogglePlay(nextState);
    }
  };

  return (
    <motion.div
      className="song-card"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        width: '320px', 
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '1rem',
          background: 'rgba(30, 41, 59, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isPlaying ? `1px solid ${colors.primary}` : '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          boxShadow: isPlaying ? `0 0 20px ${colors.primary}44` : '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Portada con zoom */}
        <motion.div
          style={{
            width: '65px',
            height: '65px',
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={song.portada || placeholder}
            alt={song.titulo}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {/* Texto informativo */}
        <div style={{ flex: 1, minWidth: 0, paddingRight: '10px' }}>
          <h4
            style={{
              fontSize: '1.05rem',
              fontWeight: '700',
              marginBottom: '0.2rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              // Solo aplicamos gradiente si está en Play
              background: isPlaying 
                ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                : 'none',
              WebkitBackgroundClip: isPlaying ? 'text' : 'unset',
              WebkitTextFillColor: isPlaying ? 'transparent' : 'white',
              color: isPlaying ? 'transparent' : 'white',
              display: 'block'
            }}
          >
            {song.titulo}
          </h4>

          <p
            style={{
              color: colors.textSecondary,
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0
            }}
          >
            {song.artista}
          </p>
        </div>

        {/* Botón Play y Ondas Animadas */}
        <div style={{ position: 'relative', width: '45px', height: '45px', flexShrink: 0 }}>
          <motion.button
            onClick={handlePlayClick}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: isPlaying ? 'white' : colors.primary,
              border: 'none',
              color: isPlaying ? colors.primary : 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              position: 'relative',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>

          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.span
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    border: `2px solid ${colors.primary}`, borderRadius: '50%', pointerEvents: 'none', zIndex: 1
                  }}
                />
                <motion.span
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    border: `1px solid ${colors.secondary}`, borderRadius: '50%', pointerEvents: 'none', zIndex: 1
                  }}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SongCard;