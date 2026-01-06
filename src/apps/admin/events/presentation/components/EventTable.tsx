import React from 'react';
import type { Event } from '../../domain/models/Event';
import { Icons } from '../../../../client/songs/presentation/components/Icons';

interface Props {
  events: Event[];
  onViewDetails: (event: Event) => void;
}

export const EventTable: React.FC<Props> = ({ events, onViewDetails }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    }}>
      {events.map((event) => (
        <div
          key={event.idEvento}
          onClick={() => onViewDetails(event)}
          style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
          }}
        >
          {/* IMAGEN */}
          <div style={{
            width: '100%',
            height: '200px',
            background: '#1e1b4b',
            overflow: 'hidden',
            borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
          }}>
            {event.imagen ? (
              <img
                src={event.imagen}
                alt={event.titulo}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                crossOrigin="anonymous"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '14px',
                fontWeight: '500',
              }}>
                Sin Imagen
              </div>
            )}
          </div>

          {/* CONTENIDO */}
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {/* TÍTULO */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#fff',
              margin: 0,
              lineHeight: '1.4',
            }}>
              {event.titulo}
            </h3>

            {/* INFO GRID */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <div style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>
                  <Icons.Calendar />
                </div>
                <span>{event.fecha?.split('T')[0]}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <div style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>
                  <Icons.MapPin />
                </div>
                <span>{event.lugar}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <div style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>
                  <Icons.Music2 />
                </div>
                <span>{event.generoMusical}</span>
              </div>
            </div>

            {/* ESTADO + PRECIO */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '12px',
              borderTop: '1px solid rgba(139, 92, 246, 0.1)',
              marginTop: 'auto',
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: event.estado === 'programado' ? '#8b5cf6' : '#22c55e',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {event.estado}
              </span>
              <span style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#22c55e',
              }}>
                ${event.precioEntrada}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};