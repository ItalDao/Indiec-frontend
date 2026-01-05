import type{ Artist } from "../domain/models/Artist";

export const artistsMock: Artist[] = [
  {
    id: "art-1",
    nombre: "Luna Negra",
    nombreArtistico: "Luna Negra",
    genero: "Indie Rock",
    subgeneros: ["Alternative", "Dream Pop"],
    descripcion: "Banda indie ecuatoriana",
    foto: "/images/artists/luna.jpg",
    banner: "/images/artists/luna-banner.jpg",
    seguidores: 12450,
    reproducciones: 987654,
    popularidad: 85,
    activo: true,
    verificado: true,
    canciones: ["song-1", "song-2"],
    eventos: ["event-1"]
  },
  {
    id: "art-2",
    nombre: "Indie Waves",
    genero: "Rock Alternativo",
    foto: "/images/artists/waves.jpg",
    seguidores: 8300,
    activo: true
  }
];
