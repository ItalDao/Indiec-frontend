import { useState } from 'react';
import type { Event } from '../../domain/models/Event';
import { MOCK_EVENTS } from '../../data/events.mock'; // Importamos los datos

export const useEventCrud = () => {
  // Iniciamos con los datos quemados
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  const saveEvent = async (formData: FormData) => {
    // Convertir imagen a base64 si existe
    const imageFile = formData.get('imagen') as File;
    let imagenUrl = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000";

    if (imageFile && imageFile.size > 0) {
      imagenUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsDataURL(imageFile);
      });
    }

    // 1. Extraemos los datos del formulario
    const nuevoEvento: Event = {
      idEvento: Math.floor(Math.random() * 10000), // Generamos un ID al azar
      titulo: formData.get('titulo') as string,
      generoMusical: formData.get('generoMusical') as string,
      fecha: formData.get('fecha') as string,
      lugar: formData.get('lugar') as string,
      capacidad: Number(formData.get('capacidad')),
      precioEntrada: Number(formData.get('precioEntrada')),
      descripcion: formData.get('descripcion') as string,
      imagen: imagenUrl, // Usamos la imagen convertida a base64 o default
      estado: formData.get('estado') as string || "programado"
    };

    // 2. Actualizamos el estado agregando el nuevo evento
    setEvents([...events, nuevoEvento]);
    console.log("Evento creado localmente:", nuevoEvento);
  };

  const removeEvent = (id: number) => {
    // Esto sí funciona permanentemente en la sesión actual
    setEvents(prev => prev.filter(e => e.idEvento !== id));
  };

  const updateExistingEvent = async (id: number, formData: FormData) => {
    // Convertir imagen a base64 si existe
    const imageFile = formData.get('imagen') as File;
    let imagenUrl = null;

    if (imageFile && imageFile.size > 0) {
      imagenUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsDataURL(imageFile);
      });
    }

    // Actualizar evento
    setEvents(prev => prev.map(event => {
      if (event.idEvento === id) {
        return {
          ...event,
          titulo: formData.get('titulo') as string,
          generoMusical: formData.get('generoMusical') as string,
          fecha: formData.get('fecha') as string,
          lugar: formData.get('lugar') as string,
          capacidad: Number(formData.get('capacidad')),
          precioEntrada: Number(formData.get('precioEntrada')),
          descripcion: formData.get('descripcion') as string,
          estado: formData.get('estado') as string, //Esto faltaba para la logica
          imagen: imagenUrl || event.imagen, // Mantener imagen anterior si no hay nueva
        };
      }
      return event;
    }));
    console.log("Evento actualizado:", id);
  };

  return { events, saveEvent, removeEvent, updateExistingEvent };
};
/*import { useState, useEffect, useCallback } from 'react';
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
*/