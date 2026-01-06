export interface Artist {
  id: number;
  nombre: string;
  genero: string;
  pais: string;
  imagen: string;
  seguidores: number;
  verificado: boolean;
  descripcion: string;
  cancionesTotales: number;
}

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 1,
    nombre: 'Victorz',
    genero: 'Rock',
    pais: 'Colombia',
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
    seguidores: 15420,
    verificado: true,
    descripcion: 'Banda de rock progresivo de Bogotá con un sonido único y experimental.',
    cancionesTotales: 24,
  },
  {
    id: 2,
    nombre: 'María García',
    genero: 'Pop',
    pais: 'México',
    imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop',
    seguidores: 28650,
    verificado: true,
    descripcion: 'Compositora y cantante pop mexicana con influencias latinas contemporáneas.',
    cancionesTotales: 18,
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    genero: 'Jazz',
    pais: 'Argentina',
    imagen: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=400&auto=format&fit=crop',
    seguidores: 9340,
    verificado: false,
    descripcion: 'Pianista de jazz porteño especializado en bebop y jazz fusion.',
    cancionesTotales: 32,
  },
  {
    id: 4,
    nombre: 'Laura Martínez',
    genero: 'Indie',
    pais: 'Chile',
    imagen: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop',
    seguidores: 12780,
    verificado: true,
    descripcion: 'Productora de música indie con sonidos experimentales y atmosféricos.',
    cancionesTotales: 28,
  },
  {
    id: 5,
    nombre: 'David López',
    genero: 'Electrónica',
    pais: 'España',
    imagen: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=400&auto=format&fit=crop',
    seguidores: 34210,
    verificado: true,
    descripcion: 'DJ y productor de música electrónica con éxitos en festivales europeos.',
    cancionesTotales: 45,
  },
  {
    id: 6,
    nombre: 'Sofia Sánchez',
    genero: 'Reggaeton',
    pais: 'Puerto Rico',
    imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop',
    seguidores: 45680,
    verificado: true,
    descripcion: 'Artista de reggaeton con ritmo caribeño y letras empoderadas.',
    cancionesTotales: 21,
  },
  {
    id: 7,
    nombre: 'Juan Pablo Herrera',
    genero: 'Trap',
    pais: 'Perú',
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
    seguidores: 22340,
    verificado: false,
    descripcion: 'Rapero peruano con influencias del trap latino y crítica social.',
    cancionesTotales: 35,
  },
  {
    id: 8,
    nombre: 'Isabella Costa',
    genero: 'Samba',
    pais: 'Brasil',
    imagen: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=400&auto=format&fit=crop',
    seguidores: 38920,
    verificado: true,
    descripcion: 'Cantante de samba brasileña con influencias de bossa nova y MPB.',
    cancionesTotales: 26,
  },
];
