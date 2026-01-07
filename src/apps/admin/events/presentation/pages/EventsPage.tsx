import React, { useState } from 'react';
import { useEventCrud } from '../hooks/useEventCrud';
import { EventForm } from '../components/EventForm';
import { Modal } from '../../../../../shared/ui';
import { EventTable } from '../components/EventTable';
import type { Event } from '../../domain/models/Event';
import { Icons } from '../../../../client/songs/presentation/components/Icons';

export const EventsPage: React.FC = () => {

  
  const { events, saveEvent, removeEvent, updateExistingEvent } = useEventCrud();
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const handleOpenCreate = () => {
    setEditingEvent(null);
    setIsFormModalOpen(true);
  };
  
  const handleOpenEditFromView = (event: Event) => {
    setEditingEvent(event);
    setIsViewModalOpen(false);
    setIsFormModalOpen(true);
  };
  
  // --- NUEVOS ESTADOS PARA FILTROS ---
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterFecha, setFilterFecha] = useState<string>('');

  // --- LÓGICA DE FILTRADO ---
  const filteredEvents = events.filter(event => {
    const matchesEstado = filterEstado === 'todos' || event.estado === filterEstado;
    const matchesFecha = !filterFecha || event.fecha.includes(filterFecha);
    return matchesEstado && matchesFecha;
  });
  const handleFormSuccess = async (formData: FormData) => {
    if (editingEvent?.idEvento) {
      await updateExistingEvent(editingEvent.idEvento, formData);
    } else {
      await saveEvent(formData);
    }
    setIsFormModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: 'clamp(42px, 7vw, 64px)', 
            fontWeight: '900',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-2px',
          }}>
            Gestión de Eventos
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Administra, edita y controla todos tus eventos
          </p>
        </div>

        {/* BOTÓN CREAR */}
        <div style={{ marginBottom: '40px' }}>
          <button
            onClick={handleOpenCreate}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
          >
            <Icons.Plus />
            Crear Evento
          </button>
        </div>

        {/* BARRA DE FILTROS */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          marginBottom: '24px', 
          flexWrap: 'wrap',
          alignItems: 'flex-end'
        }}>
          {/* Filtro Estado */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Estado
            </label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              style={{
                background: 'rgba(30, 27, 75, 0.7)',
                color: '#fff',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '10px 16px',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <option value="todos">Todos los estados</option>
              <option value="programado">Programados</option>
              <option value="finalizado">Finalizados</option>
              <option value="agotado">Agotados</option>
            </select>
          </div>

          {/* Filtro Fecha */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Fecha del evento
            </label>
            <input
              type="date"
              value={filterFecha}
              onChange={(e) => setFilterFecha(e.target.value)}
              style={{
                background: 'rgba(30, 27, 75, 0.7)',
                color: '#fff',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '10px 16px',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '14px',
                colorScheme: 'dark' // Esto hace que el icono del calendario sea blanco
              }}
            />
          </div>

          {/* Botón Limpiar (Solo si hay filtros activos) */}
          {(filterEstado !== 'todos' || filterFecha !== '') && (
            <button
              onClick={() => { setFilterEstado('todos'); setFilterFecha(''); }}
              style={{
                background: 'transparent',
                color: '#8b5cf6',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                paddingBottom: '12px',
                textDecoration: 'underline'
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>


        {/* TABLA DE EVENTOS */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          padding: '32px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          width: '100%',
        }}>
          <EventTable
            events={filteredEvents} // <-- Cambiado de 'events' a 'filteredEvents'
            onViewDetails={(event) => {
              setSelectedEvent(event);
              setIsViewModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* MODAL DETALLES */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalles del Evento"
      >
        {selectedEvent && (
          <div style={{ 
            maxHeight: '75vh', 
            overflowY: 'auto', 
            paddingRight: '10px',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem' 
          }} className="pr-2">
            <img
              src={
                selectedEvent?.imagen 
                  ? (selectedEvent.imagen.startsWith('http') 
                      ? selectedEvent.imagen 
                      : `http://localhost:9000/uploads/eventos/${selectedEvent.imagen}`)
                  : 'https://via.placeholder.com/800x600?text=Sin+Imagen'
              }
              alt={selectedEvent?.titulo || 'Evento'}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
            
            {/* TÍTULO + PRECIO */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', padding: '0 8px' }}>
              <div>
                <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px', color: '#fff', margin: 0 }}>
                  {selectedEvent.titulo}
                </h2>
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold',
                  color: '#8b5cf6',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {selectedEvent.generoMusical}
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  display: 'block', 
                  fontSize: '12px',
                  color: '#94a3b8',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  Precio
                </span>
                <span style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  color: '#22c55e',
                  fontFamily: 'monospace'
                }}>
                  ${selectedEvent.precioEntrada}
                </span>
              </div>
            </div>

            {/* INFO GRID */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px 32px',
              padding: '0 8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#8b5cf6', marginTop: '4px', minWidth: '24px' }}>
                  <Icons.Calendar />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '4px', textTransform: 'uppercase' }}>Fecha</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{new Date(selectedEvent.fecha).toLocaleDateString()}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#8b5cf6', marginTop: '4px', minWidth: '24px' }}>
                  <Icons.Music2 />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '4px', textTransform: 'uppercase' }}>Género</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{selectedEvent.generoMusical}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#8b5cf6', marginTop: '4px', minWidth: '24px' }}>
                  <Icons.MapPin />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '4px', textTransform: 'uppercase' }}>Ubicación</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{selectedEvent.lugar}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ color: '#8b5cf6', marginTop: '4px', minWidth: '24px' }}>
                  <Icons.Users />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '4px', textTransform: 'uppercase' }}>Capacidad</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{selectedEvent.capacidad} personas</p>
                </div>
              </div>
            </div>

            {/* ESTADO */}
            <div style={{ padding: '0 8px' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '8px', textTransform: 'uppercase' }}>
                Estado
              </p>
              <span style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: selectedEvent.estado === 'programado' ? '#8b5cf6' : '#22c55e',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {selectedEvent.estado}
              </span>
            </div>

            {/* DESCRIPCIÓN */}
            <div style={{ padding: '0 8px' }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '12px', textTransform: 'uppercase' }}>
                Descripción
              </p>
              <div style={{
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                background: 'rgba(30, 27, 75, 0.5)',
                color: '#cbd5e1',
                fontSize: '15px',
                lineHeight: '1.6',
              }}>
                {selectedEvent.descripcion || 'Este evento no cuenta con una descripción detallada.'}
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div style={{
              display: 'flex',
              gap: '12px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(139, 92, 246, 0.2)',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => handleOpenEditFromView(selectedEvent)}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  flex: 1,
                  minWidth: '120px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (selectedEvent.idEvento) removeEvent(selectedEvent.idEvento);
                  setIsViewModalOpen(false);
                }}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  flex: 1,
                  minWidth: '120px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Eliminar
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: '#cbd5e1',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  flex: 1,
                  minWidth: '120px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.color = '#8b5cf6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL FORM */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingEvent ? 'Actualizar Evento' : 'Nuevo Evento'}
      >
        <EventForm
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormModalOpen(false)}
          initialData={editingEvent}
        />
      </Modal>
    </div>
  );
};