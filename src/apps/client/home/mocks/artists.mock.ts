import type{ Artist } from "../domain/models/Artist";

export const artistsMock: Artist[] = [
  {
    id: "art-1",
    nombre: "Luna Negra",
    nombreArtistico: "Luna Negra",
    genero: "Indie Rock",
    subgeneros: ["Alternative", "Dream Pop"],
    descripcion: "Banda indie ecuatoriana",
    foto: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=400&fit=crop",
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
    nombreArtistico: "Indie Waves",
    genero: "Rock Alternativo",
    foto: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop",
    seguidores: 8300,
    activo: true
  }
];
