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
    imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop&q=80",
    activo: true,
    tieneArtistas: true
  },
  {
    id: "event-2",
    titulo: "Noche de Música en Vivo",
    descripcion: "Una noche inolvidable con los mejores artistas",
    fecha: "2025-07-20T22:00:00.000Z",
    lugar: "Teatro Nacional",
    artistas: ["art-1"],
    precioEntrada: 35,
    imagen: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&h=400&fit=crop&q=80",
    activo: true,
    tieneArtistas: true
  },
  {
    id: "event-3",
    titulo: "Concierto Acústico",
    descripcion: "Presentación acústica de los mejores",
    fecha: "2025-09-10T19:00:00.000Z",
    lugar: "Anfiteatro al aire libre",
    artistas: ["art-2"],
    precioEntrada: 20,
    imagen: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop&q=80",
    activo: true,
    tieneArtistas: true
  },
  {
    id: "event-4",
    titulo: "Festival de Verano",
    descripcion: "Tres días de música, arte y gastronomía",
    fecha: "2025-07-28T18:00:00.000Z",
    lugar: "Parque Central",
    artistas: ["art-1", "art-2"],
    precioEntrada: 60,
    imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop&q=80",
    activo: true,
    tieneArtistas: true
  }
];
