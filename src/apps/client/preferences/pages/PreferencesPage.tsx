import { useState } from 'react';
import { useGustos } from '../hooks/usePreferences';
import type { CreateGustoDTO } from '../domain/models/MusicPreference';

export const PreferencesPage = () => {
  const { gustos, loading, crear, editar, eliminar } = useGustos();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateGustoDTO>({ titulo: '', genero: '', rating: 3 });

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Mis Gustos</h1>
      
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (editingId) {
          await editar(editingId, form);
          setEditingId(null);
        } else {
          await crear(form);
        }
        setForm({ titulo: '', genero: '', rating: 3 });
      }}>
        <input placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
        <input placeholder="Género" value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })} required />
        <input type="range" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} />
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ titulo: '', genero: '', rating: 3 }); }}>Cancelar</button>}
      </form>

      {gustos.map(g => (
        <div key={g.id}>
          <h3>{g.titulo}</h3>
          <p>{g.genero} - {g.rating}/5</p>
          <button onClick={() => { setEditingId(g.id); setForm(g); }}>Editar</button>
          <button onClick={() => eliminar(g.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};