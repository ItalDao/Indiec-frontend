import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Song } from '../../domain/models/Song';

interface Props {
    onSubmit: (song: Song) => void;
    initialData?: Partial<Song>; // Para cuando editamos
    isEditing?: boolean;
}

export const SongFormPage = ({ onSubmit, initialData, isEditing }: Props) => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState<Song>({
    
    titulo: initialData?.titulo?.trim() || '',
    artista: initialData?.artista?.trim() || '',
    genero: initialData?.genero?.trim() || '',
    album: initialData?.album?.trim() || '',
    año: initialData?.año || new Date().getFullYear(),
    duracion: initialData?.duracion?.trim() || '',
    portada: initialData?.portada?.trim() || '',
    linkAudio: initialData?.linkAudio?.trim() || '',
});
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'año' ? Number(value) : value 
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        navigate('/'); // Al guardar, volvemos automáticamente al catálogo
    };

    const inputStyle = {
        padding: '12px',
        backgroundColor: '#0F172A',
        border: '1px solid #374151',
        color: 'white',
        borderRadius: '8px',
        width: '100%',
        boxSizing: 'border-box' as const,
        outline: 'none'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.85rem',
        color: '#94A3B8',
        marginBottom: '6px',
        marginTop: '10px'
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#0F172A', 
            padding: '20px' 
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '500px', 
                backgroundColor: '#1E293B', 
                padding: '30px', 
                borderRadius: '20px', 
                border: '1px solid #334155',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}>
                <h2 style={{ color: '#A78BFA', marginBottom: '25px', textAlign: 'center', fontSize: '1.8rem' }}>
                    {isEditing ? '📝 Editar Canción' : '🎵 Registrar Canción'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <label style={labelStyle}>Título</label>
                    <input name="titulo" value={formData.titulo} placeholder="Ej: Thriller" onChange={handleChange} style={inputStyle} required />
                    
                    <label style={labelStyle}>Artista</label>
                    <input name="artista" value={formData.artista} placeholder="Nombre del artista" onChange={handleChange} style={inputStyle} required />
                    
                    {/* FILA COMPARTIDA: AÑO Y DURACIÓN */}
                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Año</label>
                            <input name="año" type="number" onChange={handleChange} value={formData.año} style={inputStyle} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Duración</label>
                            <input name="duracion" value={formData.duracion} placeholder="Ej: 3:45" onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>

                    {/* GÉNERO ABAJO - FILA COMPLETA */}
                    <label style={labelStyle}>Género</label>
                    <input name="genero" value={formData.genero} placeholder="Pop, Rock, Jazz..." onChange={handleChange} style={inputStyle} />

                    <label style={labelStyle}>Álbum</label>
                    <input name="album" value={formData.album} placeholder="Nombre del álbum" onChange={handleChange} style={inputStyle} />
                    
                    <label style={labelStyle}>URL Portada (Imagen)</label>
                    <input name="portada" value={formData.portada} placeholder="https://..." onChange={handleChange} style={inputStyle} />
                    
                    <label style={labelStyle}>URL Audio (Link)</label>
                    <input name="linkAudio" value={formData.linkAudio} placeholder="https://youtube.com/..." onChange={handleChange} style={inputStyle} />

                    <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                        <button type="submit" style={{ 
                            flex: 2, padding: '14px', backgroundColor: '#7C3AED', 
                            color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' 
                        }}>
                            {isEditing ? 'ACTUALIZAR' : 'GUARDAR'}
                        </button>
                        
                        <button type="button" onClick={() => navigate('/')} style={{ 
                            flex: 1, padding: '14px', backgroundColor: '#475569', 
                            color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' 
                        }}>
                            CANCELAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};