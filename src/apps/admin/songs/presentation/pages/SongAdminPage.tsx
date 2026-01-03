import React, { useState } from 'react';
import { useSongs } from '../hooks/useSongs';
import { SongListPage } from './SongListPage';
import { type Song } from '../../domain/models/Song';

export const SongsAdminPage = () => {
    // 1. Agregamos updateSong del hook para poder editar
    const { songs, loading, createSong, updateSong, deleteSong } = useSongs();

    // 2. Necesitas este estado para saber si estás editando o creando
    const [editingSong, setEditingSong] = useState<Song | null>(null);

    const [formData, setFormData] = useState<Partial<Song>>({
        titulo: '', artista: '', genero: '', año: 2025, album: '', duracion: '', portada: '', linkAudio: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Esta función ahora llena el formulario con los datos de la canción
    const handleEdit = (song: Song) => {
        setEditingSong(song);
        setFormData(song); 
    };

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let result;
        if (editingSong && editingSong.id) {
            // Si estamos editando, usamos update
            result = await updateSong(editingSong.id, formData as Song);
        } else {
            // Si no hay edición, creamos nueva
            result = await createSong(formData as Song);
        }
        
        if (result.success) {
            alert(editingSong ? "¡Actualizada!" : "¡Creada!");
            setEditingSong(null); // Resetear estado de edición
            setFormData({
                titulo: '', artista: '', genero: '', año: 2025, album: '', duracion: '', portada: '', linkAudio: ''
            });
        } else {
            alert("Error: " + result.message);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', padding: '2rem', backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
            
            
            <div style={{ flex: 1, maxWidth: '500px' }}>
                <h2 style={{ color: '#A78BFA' }}>Registrar Canción</h2>
                <form onSubmit={handleGuardar} style={{ display: 'grid', gap: '1rem', backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '12px' }}>
                    <input name="titulo" placeholder="Título" value={formData.titulo} onChange={handleInputChange} style={inputStyle} required />
                    <input name="artista" placeholder="Artista" value={formData.artista} onChange={handleInputChange} style={inputStyle} required />
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input name="genero" placeholder="Género" value={formData.genero} onChange={handleInputChange} style={inputStyle} />
                        <input name="año" type="number" value={formData.año} onChange={handleInputChange} style={inputStyle} />
                    </div>

                    <input name="album" placeholder="Álbum" value={formData.album} onChange={handleInputChange} style={inputStyle} />
                    <input name="portada" placeholder="URL Portada (Imagen)" value={formData.portada} onChange={handleInputChange} style={inputStyle} />
                    <input name="linkAudio" placeholder="URL de audio (enlace)" value={formData.linkAudio} onChange={handleInputChange} style={inputStyle} />
                    
                    <button type="submit" style={{ 
                        backgroundColor: '#7C3AED', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
                    }}>
                        GUARDAR
                    </button>
                </form>
            </div>


            
            <div style={{ flex: 1.2 }}>
                <h2 style={{ marginBottom: '1rem' }}>Catálogo musical</h2>
                
                <SongListPage songs={songs} loading={loading} onDelete={deleteSong} onEdit={handleEdit} />
            </div>

        </div>
    );
};

// Estilo rápido para los inputs
const inputStyle = {
    padding: '0.8rem',
    borderRadius: '6px',
    border: '1px solid #334155',
    backgroundColor: '#0F172A',
    color: 'white',
    width: '100%',
    boxSizing: 'border-box' as 'border-box'
};