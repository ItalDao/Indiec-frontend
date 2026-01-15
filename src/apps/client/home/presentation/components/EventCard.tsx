// src/apps/client/home/presentation/components/EventCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../../../../shared/theme/colors';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  imagen?: string;
  precioEntrada?: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const placeholderImage = 'https://placehold.co/600x400/1E293B/64748B?text=Evento+Indie';

  const formattedDate = new Date(event.fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
   
       <Link to={`/client/store/${event.id}`} style={{ textDecoration: 'none' }}>
      <motion.div
      
whileHover={{
  scale: 1.05,
  y: -10,
  transition: { duration: 0.3 },
}}


        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Contenedor glassmorphism */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = `1px solid ${colors.secondary}`;
            e.currentTarget.style.boxShadow = '0 24px 50px rgba(236, 72, 153, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid rgba(236, 72, 153, 0.3)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
          }}
        >
          {/* Imagen con overlay */}
          <div style={{ position: 'relative' }}>
            <img
              src={event.imagen || placeholderImage}
              alt={event.nombre}
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Overlay gradiente + título con gradiente permanente */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.5rem 1.5rem',
                background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.9) 100%)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  marginBottom: '0.5rem',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {event.nombre}
              </h3>
            </div>
          </div>

          {/* Info inferior */}
          <div style={{ padding: '1.5rem' }}>
            <p style={{ color: colors.textSecondary, fontSize: '1rem', marginBottom: '0.75rem' }}>
              📅 {formattedDate} • 📍 {event.lugar}
            </p>

            {event.precioEntrada !== undefined && (
              <p
                style={{
                  color: colors.primary,
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  marginBottom: '1.25rem',
                }}
              >
                Desde ${event.precioEntrada.toFixed(2)}
              </p>
            )}

            {/* Botón premium */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              style={{
                width: '100%',
                padding: '1rem',
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.secondaryDark || '#C41E6A'})`,
                color: colors.text,
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              Ver entradas
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default EventCard;