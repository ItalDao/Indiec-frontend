import React from 'react';
import { type Song } from '../../domain/models/Song';

interface Props {
    songs: Song[];
    loading: boolean;
    onDelete: (id: string | number) => void;
    onEdit: (song: Song) => void;
}

export const SongListPage = ({ songs, loading, onDelete, onEdit }: Props) => {
    
    if (loading) {
        return <p style={{ color: '#94A3B8', textAlign: 'center', padding: '2rem' }}>Cargando catálogo...</p>;
    }

    if (!songs || songs.length === 0) {
        return <p style={{ color: '#94A3B8', textAlign: 'center', padding: '2rem' }}>No hay canciones registradas.</p>;
    }

    
    const limpiarTexto = (texto: string | undefined) => {
        if (!texto) return '';
        try {
            return decodeURIComponent(texto).replace(/%20/g, ' ').trim();
        } catch (e) {
            return texto.replace(/%20/g, ' ').trim();
        }
    };

    // LÓGICA DE AGRUPACIÓN: Agrupa las canciones por nombre de artista
    const songsByArtist = songs.reduce((groups: { [key: string]: Song[] }, song) => {
        const artista = limpiarTexto(song.artista) || 'Artista Desconocido';
        if (!groups[artista]) groups[artista] = [];
        groups[artista].push(song);
        return groups;
    }, {});

    return (
        <div style={containerStyle}>
            {Object.entries(songsByArtist).map(([nombreArtista, artistSongs]) => (
                <div key={nombreArtista} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <h2 style={headerStyle}>
                        {nombreArtista}
                    </h2>

                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                        {artistSongs.map((song) => {
                            const titulo = limpiarTexto(song.titulo);
                            const genero = limpiarTexto(song.genero);
                            const album = limpiarTexto(song.album);
                            const urlFinal = song.portada ? decodeURIComponent(song.portada).trim() : null;

                            return (
                                <div key={song.id} style={cardStyle}>
                                    <img 
                                        src={urlFinal || 'https://placehold.co/60x60/1e293b/a78bfa?text=MUSIC'} 
                                        alt="Portada" 
                                        style={imgStyle}
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/60x60/1e293b/a78bfa?text=ERR'; }}
                                    />
                                    
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <h3 style={titleStyle}>{titulo}</h3>
                                        <small style={{ color: '#94A3B8', display: 'block', marginTop: '2px' }}>
                                            {genero} • {album} ({song.año || '2025'}) {song.duracion && ` • ⏱️ ${limpiarTexto(song.duracion)}`}
                                        </small>
                                    </div>

                                    {/* BOTONES DE ACCIÓN: Solo Editar y Eliminar */}
                                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <button onClick={() => onEdit(song)} title="Editar" style={editBtnStyle}>
                                            ✏️
                                        </button>

                                        <button onClick={() => song.id && onDelete(song.id)} title="Eliminar" style={deleteBtnStyle}>
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', gap: '1.5rem',
    maxHeight: '85vh', overflowY: 'auto', paddingRight: '1rem',
    width: '100%', boxSizing: 'border-box'
};

const headerStyle: React.CSSProperties = {
    color: '#A78BFA', fontSize: '1.1rem', borderLeft: '4px solid #7C3AED', 
    paddingLeft: '0.8rem', margin: '0.5rem 0', textTransform: 'uppercase', letterSpacing: '1px'
};

const cardStyle: React.CSSProperties = {
    backgroundColor: '#1E293B', padding: '0.8rem 1.2rem', borderRadius: '12px',
    display: 'flex', alignItems: 'center', gap: '1.2rem', border: '1px solid #334155',
};

const imgStyle: React.CSSProperties = {
    width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover',
    backgroundColor: '#0F172A', border: '1px solid #475569'
};

const titleStyle: React.CSSProperties = {
    margin: 0, fontSize: '1rem', color: '#F8FAFC', 
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
};

const editBtnStyle: React.CSSProperties = {
    backgroundColor: '#334155', border: 'none', cursor: 'pointer',
    padding: '8px', borderRadius: '8px', fontSize: '0.9rem'
};

const deleteBtnStyle: React.CSSProperties = {
    backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444',
    color: '#EF4444', cursor: 'pointer', padding: '8px', borderRadius: '8px',
};