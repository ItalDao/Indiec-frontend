export interface Product {
  // Identificador
  idRopa: string;

  // Información básica
  nombre: string;
  precio: number;
  imagen?: string;      // URL de la imagen del producto

  // Relaciones
  artista: string;      // ID del artista
  tipo: string;         // Ej: camiseta, hoodie, gorra
  talla: string;        // Ej: S, M, L, XL

  // Estado
  estado: string;       // activo / inactivo / agotado

  // Auditoría
  createRopa?: string;  // fecha creación (ISO)
  updateRopa?: string;  // fecha actualización (ISO)
}

