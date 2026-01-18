import React, { useState } from 'react';
import { useEventCrud } from '../hooks/useEventCrud';
import { EventForm } from '../components/EventForm';
import { Modal } from '../../../../../shared/ui';
import { EventTable } from '../components/EventTable';
import type { Event } from '../../domain/models/Event';
import { Icons } from '../../../../client/songs/presentation/components/Icons';
import { useAlert } from '../../../../../shared/hooks/useAlert';
import { AlertContainer } from '../../../../../shared/ui/AlertContainer';

export const EventsPage: React.FC = () => {

  
  const { events, saveEvent, removeEvent, updateExistingEvent } = useEventCrud();
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventIdAEliminar, setEventIdAEliminar] = useState<string | null>(null);
  
  const { alerts, removeAlert, success, error: errorAlert, warning, info } = useAlert();
  
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
  const [filterBusqueda, setFilterBusqueda] = useState<string>('');

  // --- LÓGICA DE FILTRADO ---
  const filteredEvents = events.filter(event => {
    const matchesEstado = filterEstado === 'todos' || event.estado === filterEstado;
    const matchesFecha = !filterFecha || event.fecha.includes(filterFecha);
    const matchesBusqueda = !filterBusqueda || 
      event.titulo.toLowerCase().includes(filterBusqueda.toLowerCase()) ||
      event.lugar.toLowerCase().includes(filterBusqueda.toLowerCase()) ||
      event.generoMusical.toLowerCase().includes(filterBusqueda.toLowerCase());
    return matchesEstado && matchesFecha && matchesBusqueda;
  });
  const handleFormSuccess = async (formData: FormData) => {
    if (editingEvent?.idEvento) {
      await updateExistingEvent(editingEvent.idEvento, formData);
      success('Actualizado', 'Evento actualizado correctamente');
    } else {
      await saveEvent(formData);
      success('Creado', 'Evento creado correctamente');
    }
    setIsFormModalOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (event: Event) => {
    setEventIdAEliminar(event.idEvento);
    warning('¿Eliminar Evento?', `Estás a punto de eliminar "${event.titulo}". Esta acción no se puede deshacer.`);
  };

  const confirmarEliminarEvento = () => {
    if (eventIdAEliminar) {
      removeEvent(eventIdAEliminar);
      success('Eliminado', 'Evento eliminado correctamente');
      setEventIdAEliminar(null);
    }
  };

  const cancelarEliminarEvento = () => {
    info('Cancelado', 'Eliminación de evento cancelada');
    setEventIdAEliminar(null);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <AlertContainer alerts={alerts} onRemove={removeAlert} />
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
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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

        {/* BARRA DE FILTROS MEJORADA */}
<div style={{ 
  display: 'flex',
  gap: '16px',
  marginBottom: '40px',
  flexWrap: 'wrap',
  background: 'rgba(30, 41, 59, 0.4)',
  backdropFilter: 'blur(12px)',
  padding: '24px',
  borderRadius: '20px',
  border: '1px solid rgba(139, 92, 246, 0.2)',
  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
  alignItems: 'end'
}}>
  
  {/* Barra de Búsqueda */}
  <div style={{ flex: 2 }}>
    <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Buscar Evento
    </label>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <span style={{ 
        position: 'absolute', 
        left: '16px', 
        display: 'flex',
        color: '#8b5cf6',
        opacity: 0.7,
        pointerEvents: 'none'
      }}>
        <Icons.Search />
      </span>
      <input
        placeholder="Título, lugar, género..."
        value={filterBusqueda}
        onChange={(e) => setFilterBusqueda(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px 12px 45px',
          background: 'rgba(30, 27, 75, 0.4)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '10px',
          color: '#e2e8f0',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box' as const,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
      />
    </div>
  </div>
  
  {/* Filtro Estado */}
  <div>
    <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Estado
    </label>
    <select
      value={filterEstado}
      onChange={(e) => setFilterEstado(e.target.value)}
      style={{
        width: '100%',
        padding: '12px 16px',
        background: 'rgba(30, 27, 75, 0.4)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '10px',
        color: '#e2e8f0',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box' as const,
        cursor: 'pointer',
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
    >
      <option value="todos" style={{ background: '#1e1b4b' }}>Todos los estados</option>
      <option value="programado" style={{ background: '#1e1b4b' }}>Programados</option>
      <option value="finalizado" style={{ background: '#1e1b4b' }}>Finalizados</option>
      <option value="agotado" style={{ background: '#1e1b4b' }}>Agotados</option>
    </select>
  </div>

  {/* Filtro Fecha */}
  <div>
    <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Fecha
    </label>
    <input
      type="date"
      value={filterFecha}
      onChange={(e) => setFilterFecha(e.target.value)}
      style={{
        width: '100%',
        padding: '12px 16px',
        background: 'rgba(30, 27, 75, 0.4)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '10px',
        color: '#e2e8f0',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box' as const,
        colorScheme: 'dark',
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
    />
  </div>

  {/* Botón Reset */}
  {(filterEstado !== 'todos' || filterFecha !== '' || filterBusqueda !== '') && (
    <button
      onClick={() => { setFilterEstado('todos'); setFilterFecha(''); setFilterBusqueda(''); }}
      style={{
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        fontSize: '13px',
        fontWeight: '700',
        padding: '10px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
    >
      Limpiar Filtros
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
            events={filteredEvents}
            onViewDetails={(event) => {
              setSelectedEvent(event);
              setIsViewModalOpen(true);
            }}
            onEdit={(event) => {
              setEditingEvent(event);
              setIsFormModalOpen(true);
            }}
            onDelete={handleDeleteEvent}
          />
        </div>
      </div>

      {/* MODAL DETALLES */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icons.FileText />
            Detalles del Evento
          </div>
        }
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
                selectedEvent?.imagen && typeof selectedEvent.imagen === 'string'
                  ? (selectedEvent.imagen.startsWith('http') 
                      ? selectedEvent.imagen 
                      : `http://localhost:9000/uploads/eventos/${selectedEvent.imagen}`)
                  : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%231e1b4b" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23cbd5e1" text-anchor="middle" dy=".3em"%3ESin Imagen%3C/text%3E%3C/svg%3E'
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
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {editingEvent ? <Icons.Edit /> : <Icons.Plus />}
            {editingEvent ? 'Actualizar Evento' : 'Nuevo Evento'}
          </div>
        }
      >
        <EventForm
          onSuccess={handleFormSuccess}
          onError={(message) => errorAlert('Error', message)}
          onCancel={() => setIsFormModalOpen(false)}
          initialData={editingEvent}
        />
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      {eventIdAEliminar && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(30, 20, 50, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            padding: '28px',
            maxWidth: '400px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              color: '#f59e0b',
              fontSize: '18px',
              fontWeight: '700',
            }}>¿Eliminar evento?</h3>
            <p style={{
              margin: '0 0 24px 0',
              color: '#cbd5e1',
              fontSize: '14px',
              lineHeight: '1.6',
            }}>Esta acción no se puede deshacer. El evento será eliminado permanentemente.</p>
            <div style={{
              display: 'flex',
              gap: '12px',
            }}>
              <button
                onClick={cancelarEliminarEvento}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  background: 'transparent',
                  color: '#8b5cf6',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminarEvento}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};