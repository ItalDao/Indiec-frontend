import React, { useState } from 'react';
import { useEventCrud } from '../hooks/useEventCrud';
import { EventForm } from '../components/EventForm';
import { Button, Modal } from '../../../../../shared/ui';
import { EventTable } from '../components/EventTable';
import type { Event } from '../../domain/models/Event';
import { colors } from '../../../../../shared/theme/colors';
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* HEADER */}
        <header className="flex items-center justify-between py-10 eventosc">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Gestión de Eventos
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Administra, edita y controla los eventos publicados
            </p>
          </div>

          <Button
            onClick={handleOpenCreate}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all"
          >
            + Crear Evento
          </Button>
        </header>

        {/* TABLA DE EVENTOS */}
        <div className="w-full">
          <EventTable
            events={events}
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

            {/*<div className=" w-full rounded-[32px] overflow-hidden flex-shrink-0 shadow-xl border border-slate-100 dark:border-slate-800">
              <img
                src={`http://localhost:9000/uploads/eventos/${selectedEvent.imagen}`}
                alt={selectedEvent.titulo}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div> */}
            <img
              src={
                selectedEvent?.imagen 
                  ? (selectedEvent.imagen.startsWith('http') 
                      ? selectedEvent.imagen 
                      : `http://localhost:9000/uploads/eventos/${selectedEvent.imagen}`)
                  : 'https://via.placeholder.com/800x600?text=Sin+Imagen' // Imagen de respaldo
              }
              alt={selectedEvent?.titulo || 'Evento'}
              className="w-full h-full object-cover"
            />
            

            {/* TÍTULO + PRECIO */}
            <div className="flex justify-between items-start gap-6 px-2">
              <div>
                <h2 className="text-4xl font-black leading-tight">
                  {selectedEvent.titulo}
                </h2>
                <span className="inline-block mt-2 text-xs font-bold uppercase tracking-widest text-purple-500">
                  {selectedEvent.generoMusical}
                </span>
              </div>

              <div className="text-right">
                <span className="block text-[10px] uppercase text-slate-400 font-bold">
                  Precio
                </span>
                <span className="text-4xl font-black text-emerald-500 font-mono">
                  ${selectedEvent.precioEntrada}
                </span>
              </div>
            </div>

            {/* INFO GRID (SIN BORDES NI FONDOS) */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-12 px-2">
              <div className="flex items-start gap-3">
                <div className="text-purple-500 mt-1 text-xl">📅</div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-tight">Fecha</p>
                  <p className="text-sm font-semibold">{new Date(selectedEvent.fecha).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-yellow-500 mt-1 text-xl">🎵</div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-tight">Género</p>
                  <p className="text-sm font-semibold">{selectedEvent.generoMusical}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-rose-500 mt-1 text-xl">📍</div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-tight">Ubicación</p>
                  <p className="text-sm font-semibold">{selectedEvent.lugar}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-emerald-500 mt-1 text-xl">👥</div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-tight">Capacidad</p>
                  <p className="text-sm font-semibold">{selectedEvent.capacidad} personas</p>
                </div>
              </div>
            </div>

            {/* ESTADO (LIMPIO) */}
            <div className=" items-left justify-between px-2">
              <span className="text-[10px] uppercase text-slate-400 font-black tracking-widest">
                Estado
              </span>
              <div className={`text-xs font-black uppercase tracking-wider ${
                selectedEvent.estado === 'programado' ? 'text-purple-500' : 'text-emerald-500'
              }`}>
                {selectedEvent.estado}
              </div>
            </div>

            {/* DESCRIPCIÓN (ÚNICO CON BORDE) */}
            <div className="px-2">
              <span className="block text-[10px] uppercase text-slate-400 font-black tracking-widest mb-3">
                Descripción
              </span>
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {selectedEvent.descripcion || 'Este evento no cuenta con una descripción detallada.'}
              </div>
            </div>

            {/* FOOTER ACTIONS (Dentro del scroll para fácil acceso) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  onClick={() => handleOpenEditFromView(selectedEvent)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg flex-1 sm:flex-none"
                  variant="primary"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    if (selectedEvent.idEvento) removeEvent(selectedEvent.idEvento);
                    setIsViewModalOpen(false);
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg flex-1 sm:flex-none"
                  variant='eliminar'
                >
                  Eliminar
                </Button>
                
              </div>
              <Button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ flex: 1, border: `1px solid ${colors.border}` }}
                variant='cancelar'
              >
                Cancelar
              </Button>


              
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