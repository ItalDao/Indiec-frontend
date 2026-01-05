// src/apps/client/home/presentation/components/ArtistCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../../../../shared/theme/colors';
import { Link } from 'react-router-dom';

interface Artist {
  id: string;
  nombre: string;
  foto?: string;
  genero?: string;
}

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const placeholderImage = `https://placehold.co/300x300/1E293B/94A3B8?text=${artist.nombre.charAt(0).toUpperCase()}`;

  return (
    <Link to={`/client/artists/${artist.id}`} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}

        whileHover={{
          scale: 1.08,
          y: -12,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}

        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Fondo glassmorphism */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.45)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = `1px solid ${colors.primary}`;
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
          }}
        >
          {/* Imagen circular con borde gradiente */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '1.25rem',
              border: '5px solid transparent',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}) padding-box, linear-gradient(135deg, ${colors.primary}, ${colors.secondary}) border-box`,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src={artist.foto || placeholderImage}
              alt={artist.nombre}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Nombre con efecto gradiente permanente (mejor rendimiento) */}
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '0.5rem',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {artist.nombre}
          </h3>

          {/* Género */}
          {artist.genero && (
            <p
              style={{
                color: colors.textSecondary,
                fontSize: '0.925rem',
                textAlign: 'center',
                marginTop: '0.25rem',
              }}
            >
              {artist.genero}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ArtistCard;
