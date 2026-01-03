export interface Event {
  idEvento?: number;
  titulo: string;
  lugar: string;
  fecha: string;
  generoMusical: string;
  descripcion: string;
  precioEntrada: number;
  capacidad: number;
  imagen: string | null | File;
  estado: string;
}