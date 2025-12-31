// Gustos 
export interface Gusto {
  id: string;
  titulo: string;
  genero: string;
  rating: number; // 1-5
}

export type CreateGustoDTO = Omit<Gusto, 'id'>;