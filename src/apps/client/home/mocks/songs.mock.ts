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
    imagen: "https://images.unsplash.com/photo-1533174072545-7a6b6ad7b6c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&referrer=grok.com"  // Noche oscura, luna, indie aesthetic
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
    imagen: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b8/98/f3/b898f313-5f20-3ccf-9c13-9b9e0ee040a0/artwork.jpg/1200x630bf-60.jpg"  // Olas, mar, vibe indie acuática
  }
];