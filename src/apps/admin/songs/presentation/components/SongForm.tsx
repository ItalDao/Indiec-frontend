import  { useState, type ChangeEvent, type FormEvent } from 'react';

export const SongForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const [formData, setFormData] = useState({
    titulo: '',
    artista: '', 
    genero: '',
    album: '',
    año: new Date().getFullYear(),
    duracion: '',
    portada: '',
    linkAudio: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    };

    return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <h2 style={{ color: '#8B5CF6' }}>Nueva Canción (Panel Admin)</h2>
        
        <input name="titulo" placeholder="Título de la canción" onChange={handleChange} required />
        <input name="artista" placeholder="Nombre del Artista (se creará si no existe)" onChange={handleChange} required />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input name="genero" placeholder="Género" onChange={handleChange} />
        <input name="año" type="number" placeholder="Año" onChange={handleChange} value={formData.año} />
        </div>

        <input name="album" placeholder="Álbum / EP" onChange={handleChange} />
        <input name="duracion" placeholder="Duración (ej: 3:45)" onChange={handleChange} />
        
        <hr style={{ border: '0.5px solid #475569', width: '100%' }} />
        
        <input name="portada" placeholder="URL de la Imagen (Portada)" onChange={handleChange} />
        <input name="linkAudio" placeholder="URL de Audio (YouTube/Spotify)" onChange={handleChange} />

        <button type="submit" style={{ padding: '1rem', backgroundColor: '#8B5CF6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Guardar Canción
        </button>
    </form>
    );
};