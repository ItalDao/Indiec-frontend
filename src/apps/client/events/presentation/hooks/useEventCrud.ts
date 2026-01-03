import { useState, useEffect, useCallback } from 'react';
import type { Event } from '../../domain/models/Event';
import { EventApi } from '../../infrastructure/api/eventApi';
import * as UseCases from '../../application/usecases';

const repository = new EventApi();

export const useEventCrud = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  // Definimos fetchEvents con useCallback para que sea estable
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await UseCases.getEvents(repository);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear Evento
  const saveEvent = async (formData: FormData) => {
    try {
      await UseCases.createEvent(repository, formData);
      await fetchEvents();
    } catch (error) {
      console.error("Error saving event", error);
    }
  };

  //  NUEVA FUNCIÓN: Actualizar Evento
  const updateExistingEvent = async (id: number, formData: FormData) => {
    try {
      // Llamamos al caso de uso de actualizar
      await UseCases.updateEvent(repository, id, formData);
      await fetchEvents();
    } catch (error) {
      console.error("Error updating event", error);
      alert("No se pudo actualizar el evento");
    }
  };

  // Eliminar Evento
  const removeEvent = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este evento permanentemente?")) {
      try {
        await UseCases.deleteEvent(repository, id);
        // Filtramos localmente para una respuesta inmediata
        setEvents(prev => prev.filter(e => e.idEvento !== id));
      } catch (error) {
        console.error("Error removing event", error);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ✅ IMPORTANTE: Se agregan todas las funciones al return para que la Page las reconozca
  return { 
    events, 
    loading, 
    saveEvent, 
    removeEvent, 
    updateExistingEvent 
  };
};