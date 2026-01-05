export interface PaginaEstatica {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  visible: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
