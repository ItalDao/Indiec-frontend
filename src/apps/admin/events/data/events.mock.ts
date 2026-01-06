import type { Event } from '../domain/models/Event';

export const MOCK_EVENTS: Event[] = [
  {
    idEvento: 1,
    titulo: "Summer Deep House",
    generoMusical: "Electronic",
    fecha: "2024-08-15",
    lugar: "Ibiza Beach Club",
    capacidad: 250,
    precioEntrada: 45,
    descripcion: "Una experiencia única bajo el sol con los mejores exponentes del Deep House internacional. Sonido envolvente y vista al mar.",
    imagen: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1000&auto=format&fit=crop",
    estado: "programado"
  },
  {
    idEvento: 2,
    titulo: "Rock Legend Classics",
    generoMusical: "Rock",
    fecha: "2024-09-10",
    lugar: "Estadio Central",
    capacidad: 5000,
    precioEntrada: 85,
    descripcion: "Las leyendas del rock se reúnen en un solo escenario para revivir los clásicos de los 80 y 90.",
    imagen: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=1000&auto=format&fit=crop",
    estado: "programado"
  },
  {
    idEvento: 3,
    titulo: "Urban Trap Night",
    generoMusical: "Trap / Urban",
    fecha: "2024-08-20",
    lugar: "The Warehouse",
    capacidad: 150,
    precioEntrada: 20,
    descripcion: "La noche más intensa de trap con artistas emergentes de la escena local.",
    imagen: "https://images.unsplash.com/photo-1514525253344-f81f3f77ed96?q=80&w=1000&auto=format&fit=crop",
    estado: "finalizado"
  }
];