import React, { useState } from 'react';
import { useEvent } from '../hooks/useEventCrud';
import { Modal } from '../../../../../shared/ui';
import { EventTable } from '../components/EventTable';
import type { Event } from '../../domain/models/Event';


export const EventsPageClient: React.FC = () => {
  const { events } = useEvent();
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterFecha, setFilterFecha] = useState<string>('');

  const filteredEvents = events.filter(event => {
    const matchesEstado = filterEstado === 'todos' || event.estado === filterEstado;
    const matchesFecha = !filterFecha || event.fecha.includes(filterFecha);
    return matchesEstado && matchesFecha;
  });

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
      backgroundAttachment: "fixed",
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
        
        {/* HEADER - Presentación minimalista */}
        <div style={{ marginBottom: '50px' }}>
          <h1 
          style={{ 
              fontSize: 'clamp(42px, 7vw, 64px)', 
              fontWeight: '900',
              marginBottom: '16px',
              color: '#fff',
              margin: 0,
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
          }}>
            Eventos
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginTop: '8px' }}>
            Explora las próximas experiencias disponibles.
          </p>
        </div>

        {/* FILTROS - Diseño unificado y moderno */}
        <div style={{ 
          display: 'flex', gap: '20px', marginBottom: '32px', padding: '20px',
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)',
          borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.2)',
          alignItems: 'flex-end', flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>Estado</label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              style={{
                width: '100%', background: '#1e293b', color: '#fff', border: '1px solid rgba(139, 92, 246, 0.2)',
                padding: '12px', borderRadius: '10px', outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="todos">🌟 Todos</option>
              <option value="programado">📅 Programados</option>
              <option value="finalizado">✅ Finalizados</option>
              <option value="agotado">🚫 Agotados</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>Fecha</label>
            <input
              type="date"
              value={filterFecha}
              onChange={(e) => setFilterFecha(e.target.value)}
              style={{
                width: '100%', background: '#1e293b', color: '#fff', border: '1px solid rgba(139, 92, 246, 0.2)',
                padding: '12px', borderRadius: '10px', outline: 'none', colorScheme: 'dark'
              }}
            />
          </div>

          {(filterEstado !== 'todos' || filterFecha !== '') && (
            <button
              onClick={() => { setFilterEstado('todos'); setFilterFecha(''); }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none',
                padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              LIMPIAR
            </button>
          )}
        </div>

        {/* TABLA - Foco en el contenido */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}>
          <EventTable
            events={filteredEvents}
            onViewDetails={(event) => {
              setSelectedEvent(event);
              setIsViewModalOpen(true);
            }}
            onEdit={() => {}} // Presentación limpia sin variable no usada
          />
        </div>
      </div>

      {/* MODAL DETALLES - UX de compra mejorada */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalles del Evento"
      >
        {selectedEvent && (
          <div style={{ 
            maxHeight: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '10px' 
          }}>
            <img
              src={selectedEvent.imagen?.startsWith('http') ? selectedEvent.imagen : `http://localhost:9000/uploads/eventos/${selectedEvent.imagen}`}
              alt={selectedEvent.titulo}
              style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{selectedEvent.titulo}</h2>
                <p style={{ color: '#8b5cf6', margin: '4px 0', fontWeight: '600', fontSize: '14px' }}>{selectedEvent.generoMusical}</p>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px 20px', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '10px', color: '#22c55e', margin: 0, fontWeight: 'bold' }}>PRECIO</p>
                <p style={{ fontSize: '24px', fontWeight: '900', color: '#22c55e', margin: 0 }}>${selectedEvent.precioEntrada}</p>
              </div>
            </div>

            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px',
              padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' 
            }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                
                <div>
                  <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>FECHA</p>
                  <p style={{ fontSize: '14px', margin: 0 }}>{new Date(selectedEvent.fecha).toLocaleDateString()}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                
                <div>
                  <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>UBICACIÓN</p>
                  <p style={{ fontSize: '14px', margin: 0 }}>{selectedEvent.lugar}</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
               <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>DESCRIPCIÓN</p>
               <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                {selectedEvent.descripcion || 'Sin descripción disponible.'}
               </p>
            </div>

            {/* ACTION AREA */}
            <div style={{ 
              display: 'flex', gap: '12px', marginTop: '10px', 
              paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <button
                disabled={selectedEvent.estado === 'agotado' || selectedEvent.estado === 'finalizado'}
                onClick={() => alert(`Iniciando compra para: ${selectedEvent.titulo}`)}
                style={{
                  flex: 2, padding: '16px', borderRadius: '12px', border: 'none',
                  fontWeight: '800', fontSize: '14px', cursor: 'pointer',
                  background: (selectedEvent.estado === 'agotado' || selectedEvent.estado === 'finalizado') ? '#334155' : 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'transform 0.2s'
                }}
              >
                {selectedEvent.estado === 'agotado' ? '🚫 AGOTADO' : selectedEvent.estado === 'finalizado' ? 'EVENTO FINALIZADO' : '🎟️ OBTENER ENTRADAS'}
              </button>
              
              <button
                onClick={() => setIsViewModalOpen(false)}
                style={{
                  flex: 1, background: 'transparent', color: '#94a3b8',
                  border: '1px solid #475569', borderRadius: '12px', cursor: 'pointer', fontWeight: '600'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};