import React, { useState, useEffect } from 'react';
import { useSongs } from '../hooks/useSongs';
import { SongListPage } from './SongListPage';

export const SongPage = () => {
    const { songs, loading, createSong, updateSong, deleteSong, loadSongs } = useSongs();
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingSong, setEditingSong] = useState<any>(null);
    
    const [formData, setFormData] = useState<any>({
        titulo: '', artista: '', genero: '', año: 2025, duracion: '', album: '', portada: '', linkAudio: ''
    });

    useEffect(() => { loadSongs(); }, []);

    const resetForm = () => {
        setEditingSong(null);
        setFormData({ titulo: '', artista: '', genero: '', año: 2025, duracion: '', album: '', portada: '', linkAudio: '' });
    };

    const handleEdit = (song: any) => {
    setEditingSong(song);
    
    // Función pequeña para limpiar los textos con %20
    const limpiar = (texto: string) => texto ? decodeURIComponent(texto) : '';

    setFormData({
        id: song.id,
        titulo: limpiar(song.titulo),
        artista: limpiar(song.artista),
        genero: limpiar(song.genero),
        año: song.año || 2025,
        duracion: limpiar(song.duracion),
        album: limpiar(song.album),
        portada: limpiar(song.portada),
        linkAudio: limpiar(song.linkAudio)
    });
    setView('form');
};

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Enviamos los datos tal cual están en el formulario
        const res = editingSong 
            ? await updateSong(editingSong.id, formData as any) 
            : await createSong(formData as any);
        
        if (res.success) {
            alert("¡Guardado correctamente!");
            resetForm();
            await loadSongs();
            setView('list');
        } else {
            alert("Error: " + res.message);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', color: 'white' }}>
            {view === 'list' ? (
                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#A78BFA', margin: 0 }}>Catálogo Musical</h2>
                        <button onClick={() => { resetForm(); setView('form'); }} style={mainBtnStyle}>
                            + Registrar Nueva Canción
                        </button>
                    </div>
                    <div style={{ backgroundColor: '#1E293B', padding: '1.5rem', borderRadius: '20px', border: '1px solid #334155' }}>
                        <SongListPage 
                            songs={songs} 
                            loading={loading} 
                            onDelete={async (id) => { if(window.confirm("¿Eliminar?")) { await deleteSong(id); loadSongs(); } }} 
                            onEdit={handleEdit} 
                        />
                    </div>
                </div>
            ) : (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                    <div style={{ 
                        width: '100%', maxWidth: '550px', backgroundColor: '#1E293B', 
                        padding: '2.5rem', borderRadius: '24px', border: '1px solid #334155'
                    }}>
                        <h2 style={{ color: '#A78BFA', textAlign: 'center', marginBottom: '2rem' }}>
                            🎵 {editingSong ? 'Editar Canción' : 'Registro'}
                        </h2>
                        
                        <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div>
                                <label style={labelStyle}>Título</label>
                                <input style={inputStyle} value={formData.titulo || ''} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Artista</label>
                                <input style={inputStyle} value={formData.artista || ''} onChange={e => setFormData({...formData, artista: e.target.value})} required />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}><label style={labelStyle}>Año</label>
                                <input type="number" style={inputStyle} value={formData.año || 2025} onChange={e => setFormData({...formData, año: e.target.value})} /></div>
                                <div style={{ flex: 1 }}><label style={labelStyle}>Duración</label>
                                <input style={inputStyle} value={formData.duracion || ''} onChange={e => setFormData({...formData, duracion: e.target.value})} /></div>
                            </div>
                            <div>
                                <label style={labelStyle}>Género</label>
                                <input style={inputStyle} value={formData.genero || ''} onChange={e => setFormData({...formData, genero: e.target.value})} />
                            </div>
                            <div>
                                <label style={labelStyle}>Álbum</label>
                                <input style={inputStyle} value={formData.album || ''} onChange={e => setFormData({...formData, album: e.target.value})} />
                            </div>
                            <div>
                                <label style={labelStyle}>URL Portada</label>
                                <input style={inputStyle} value={formData.portada || ''} onChange={e => setFormData({...formData, portada: e.target.value})} />
                            </div>
                            <div>
                                <label style={labelStyle}>Link Audio</label>
                                <input style={inputStyle} value={formData.linkAudio || ''} onChange={e => setFormData({...formData, linkAudio: e.target.value})} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" style={{ ...mainBtnStyle, flex: 1 }}>GUARDAR</button>
                                <button type="button" onClick={() => setView('list')} style={{ ...mainBtnStyle, backgroundColor: '#475569', flex: 1 }}>CANCELAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const labelStyle = { display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: '5px' };
const inputStyle = { width: '100%', padding: '0.7rem', backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' as const };
const mainBtnStyle = { backgroundColor: '#7C3AED', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const };