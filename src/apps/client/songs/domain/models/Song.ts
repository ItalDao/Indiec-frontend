// src/apps/client/songs/domain/models/Song.ts

export interface Song {
  id: number;
  titulo: string;
  album: string;
  duracion: string; // formato "MM:SS"
  streams: number;
  año: number;
  genero: string;
  artista: string;
  idArtista: number;
  imagen?: string;
  linkAudio?: string;
  isFavorite?: boolean;
}

export interface SongFilters {
  artistaId?: number;
  genero?: string;
  busqueda?: string;
  orderBy?: 'recientes' | 'populares' | 'alfabetico';
}

export interface SongCreateDTO {
  idArtista: number;
  titulo: string;
  album?: string;
  año?: number;
  duracion?: string;
  genero?: string;
}

export interface SongUpdateDTO {
  titulo?: string;
  album?: string;
  año?: number;
  duracion?: string;
  genero?: string;
  streams?: number;
}

// Utilidades
export const formatDuration = (duration: string): string => {
  return duration;
};

export const formatStreams = (streams: number): string => {
  if (streams >= 1000000) {
    return `${(streams / 1000000).toFixed(1)}M`;
  }
  if (streams >= 1000) {
    return `${(streams / 1000).toFixed(1)}K`;
  }
  return streams.toString();
};