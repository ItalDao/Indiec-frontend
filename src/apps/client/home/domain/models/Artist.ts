export interface Artist {
  // Identificadores
  id: string;
  disqueraId?: string;

  // Información básica
  nombre: string;
  nombreArtistico?: string;
  descripcion?: string;
  biografia?: string;

  // Multimedia
  foto?: string;          // URL o path de imagen
  banner?: string;        // imagen grande para perfil
  portada?: string;

  // Género / estilo
  genero?: string;
  subgeneros?: string[];

  // Redes sociales
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  spotify?: string;
  tiktok?: string;

  // Métricas
  seguidores?: number;
  reproducciones?: number;
  popularidad?: number;

  // Estado
  activo?: boolean;
  verificado?: boolean;

  // Relacionales
  canciones?: string[];   // ids de canciones
  albumes?: string[];     // ids de álbumes
  eventos?: string[];     // ids de eventos

  // Auditoría
  createdAt?: string;
  updatedAt?: string;
}