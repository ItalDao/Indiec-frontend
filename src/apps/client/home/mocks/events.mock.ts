import type { Event } from "../domain/models/Event";

export const eventsMock: Event[] = [
  {
    id: "event-1",
    titulo: "Festival Indie Quito",
    descripcion: "El mejor festival indie del año",
    fecha: "2025-08-15T20:00:00.000Z",
    lugar: "Parque Bicentenario",
    artistas: ["art-1", "art-2"],
    precioEntrada: 25,
    imagen: "/images/events/festival.jpg",
    activo: true,
    tieneArtistas: true
  }
];
