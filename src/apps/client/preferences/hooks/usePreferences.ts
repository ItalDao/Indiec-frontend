import { useState, useEffect } from 'react';
import type { Gusto, CreateGustoDTO } from '../domain/models/MusicPreference';
import { getAllGustos, createGusto, updateGusto, deleteGusto } from '../application/usecases';

export const useGustos = () => {
  const [gustos, setGustos] = useState<Gusto[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar
  useEffect(() => {
    const load = async () => {
      const data = await getAllGustos();
      setGustos(data);
      setLoading(false);
    };
    load();
  }, []);

  // CREATE
  const crear = async (data: CreateGustoDTO) => {
    const newGusto = await createGusto(data);
    setGustos(prev => [...prev, newGusto]);
    return newGusto;
  };

  // UPDATE
  const editar = async (id: string, data: Partial<CreateGustoDTO>) => {
    const updated = await updateGusto(id, data);
    setGustos(prev => prev.map(g => g.id === id ? updated : g));
    return updated;
  };

  // DELETE
  const eliminar = async (id: string) => {
    await deleteGusto(id);
    setGustos(prev => prev.filter(g => g.id !== id));
  };

  return { gustos, loading, crear, editar, eliminar };
};