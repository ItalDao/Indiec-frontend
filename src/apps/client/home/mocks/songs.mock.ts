import type { Song } from "../domain/models/Song";

export const songsMock: Song[] = [
  {
    id: "song-1",
    titulo: "Noche Indie",
    duracion: 240,
    artistaId: "art-1",
    artista: {
      id: "art-1",
      nombre: "Luna Negra"
    },
    precio: 0.99,
    activo: true,
    esReproducible: true,
    imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    portada: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"
  },
  {
    id: "song-2",
    titulo: "Olas del Mar",
    duracion: 195,
    artistaId: "art-2",
    artista: {
      id: "art-2",
      nombre: "Indie Waves"
    },
    precio: 0.99,
    activo: true,
    esReproducible: true,
    imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    portada: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
  },
  {
    id: "song-3",
    titulo: "Midnight Dreams",
    duracion: 210,
    artistaId: "art-1",
    artista: {
      id: "art-1",
      nombre: "Luna Negra"
    },
    precio: 0.99,
    activo: true,
    esReproducible: true,
    imagen: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    portada: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop"
  },
  {
    id: "song-4",
    titulo: "Electric Soul",
    duracion: 185,
    artistaId: "art-2",
    artista: {
      id: "art-2",
      nombre: "Indie Waves"
    },
    precio: 0.99,
    activo: true,
    esReproducible: true,
    imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    portada: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop"
  }
];