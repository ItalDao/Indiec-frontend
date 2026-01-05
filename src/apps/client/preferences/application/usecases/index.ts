// 
import type { Gusto, CreateGustoDTO } from '../../domain/models/MusicPreference';

let gustos: Gusto[] = [
  { id: '1', titulo: 'Metal', genero: 'Rock', rating: 5 },
  { id: '2', titulo: 'Jazz', genero: 'Jazz', rating: 4 }
];

// CREATE
export const createGusto = async (data: CreateGustoDTO): Promise<Gusto> => {
  const newGusto: Gusto = {
    ...data,
    id: Date.now().toString()
  };
  gustos.push(newGusto);
  return newGusto;
};

// READ ALL
export const getAllGustos = async (): Promise<Gusto[]> => {
  return gustos;
};

// UPDATE
export const updateGusto = async (id: string, data: Partial<CreateGustoDTO>): Promise<Gusto> => {
  const index = gustos.findIndex(g => g.id === id);
  if (index === -1) throw new Error('Gusto no encontrado');
  gustos[index] = { ...gustos[index], ...data };
  return gustos[index];
};

// DELETE
export const deleteGusto = async (id: string): Promise<void> => {
  gustos = gustos.filter(g => g.id !== id);
};