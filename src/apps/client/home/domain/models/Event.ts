export interface Event {
    // Identificador
    id: string;
  
    // Información principal
    titulo: string;
    descripcion?: string;
    fecha: string;            // ISO string (backend)
    lugar: string;
  
    // Relaciones
    artistas: string[];       // IDs de artistas
  
    // Entradas
    precioEntrada: number;
  
    // Multimedia
    imagen?: string;          // URL o path de imagen
  
    // Estado
    activo: boolean;
  
    // Campos derivados (solo frontend)
    tieneArtistas?: boolean;
  }
  