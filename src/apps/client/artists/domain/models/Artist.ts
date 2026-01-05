export interface Artist {
  id: string;
  _id?: string; // Para compatibilidad con MongoDB
  nombre: string;
  email: string;
  foto: string;
  biografia: string;
  generos: string[];
  genero?: string; // Para compatibilidad
  pais: string;
  ciudad?: string;
  popularidad: number;
  redesSociales?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    spotify?: string;
    youtube?: string;
  };
  canciones?: Song[];
  eventos?: Event[];
  merch?: MerchProduct[];
}

export interface Song {
  id: string;
  titulo: string;
  duracion: string;
  album?: string;
  reproducciones?: number;
  urlReproduccion?: string;
  urlVideo?: string;
  cover?: string;
}

export interface Event {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  ciudad: string;
  pais: string;
  precio?: number;
  urlTickets?: string;
  imagen?: string;
}

export interface MerchProduct {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion?: string;
  stock?: number;
  categoria: 'camiseta' | 'poster' | 'vinilo' | 'accesorio' | 'otro';
}

export type SortOption = 'popularidad' | 'nombre' | 'reciente';
export type ViewMode = 'grid' | 'list';