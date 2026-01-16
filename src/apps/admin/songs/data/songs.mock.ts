export interface Song {
  id: number;
  titulo: string;
  artista: string;
  album: string;
  genero: string;
  duracion: string;
  imagen: string;
  audioUrl?: string; /*agregado*/
  reproducciones: number;
  likes: number;
  estado: 'activo' | 'inactivo';
}

export const MOCK_SONGS: Song[] = [
  {
    id: 1,
    titulo: 'Neon Dreams',
    artista: 'Victorz',
    album: 'Electric Horizons',
    genero: 'Rock',
    duracion: '3:45',
    imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 125430,
    likes: 8945,
    estado: 'activo',
  },
  {
    id: 2,
    titulo: 'Corazón Salvaje',
    artista: 'María García',
    album: 'Sentimientos',
    genero: 'Pop',
    duracion: '3:28',
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 324560,
    likes: 26780,
    estado: 'activo',
  },
  {
    id: 3,
    titulo: 'Midnight Jazz',
    artista: 'Carlos Rodríguez',
    album: 'Night Sessions',
    genero: 'Jazz',
    duracion: '4:12',
    imagen: 'https://th.bing.com/th/id/OIP.vwAV4Uf7eQpRMu2yObGNtgHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 67890,
    likes: 4320,
    estado: 'activo',
  },
  {
    id: 4,
    titulo: 'Lost in Memories',
    artista: 'Laura Martínez',
    album: 'Indie Tales',
    genero: 'Indie',
    duracion: '3:54',
    imagen: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 156780,
    likes: 12450,
    estado: 'activo',
  },
  {
    id: 5,
    titulo: 'Synthesized Future',
    artista: 'David López',
    album: 'Digital Era',
    genero: 'Electrónica',
    duracion: '4:03',
    imagen: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 89234,
    likes: 5678,
    estado: 'inactivo',
  },
  {
    id: 6,
    titulo: 'Ritmo Caribeño',
    artista: 'Sofia Sánchez',
    album: 'Tropical Vibes',
    genero: 'Reggaeton',
    duracion: '3:35',
    imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 456789,
    likes: 34560,
    estado: 'activo',
  },
  {
    id: 7,
    titulo: 'Echo Chamber',
    artista: 'Victorz',
    album: 'Electric Horizons',
    genero: 'Rock',
    duracion: '3:22',
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 234567,
    likes: 15678,
    estado: 'activo',
  },
  {
    id: 8,
    titulo: 'Summer Days',
    artista: 'María García',
    album: 'Sentimientos',
    genero: 'Pop',
    duracion: '3:18',
    imagen: 'https://static.vecteezy.com/system/resources/thumbnails/007/379/506/small/pop-music-vintage-3d-lettering-retro-bold-font-typeface-pop-art-stylized-text-old-school-style-neon-light-letters-90s-80s-poster-banner-dark-violet-color-background-vector.jpg',
    audioUrl: 'https://www.youtube.com/watch?v=X4bgXH3sJ2Q&list=RDPpqnlJU4Sgo&index=2',
    reproducciones: 567890,
    likes: 45678,
    estado: 'activo',
  },
];
