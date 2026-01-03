export interface Song {
    // Identificador
    id: string;
  
    // Datos principales
    titulo: string;
    duracion: number;        // en segundos (según tu backend)
    albumId?: string | null;
    artistaId: string;
    
    artista?: {
      id: string;
      nombre: string;}
  
    // Archivo de audio
    archivo?: string | null; // URL o path del archivo
  
    // Monetización
    precio: number;
  
    // Estado
    activo: boolean;
  
    // Campos derivados (frontend only)
    esReproducible?: boolean;
    imagen?: string | null;
  }