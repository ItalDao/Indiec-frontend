import { useState } from 'react';
import { MOCK_SONGS } from '../../data/songs.mock';
import type { Song } from '../../data/songs.mock';
import { Icons } from '../../../../client/songs/presentation/components/Icons';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 25px 50px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          padding: '48px',
          maxWidth: '700px',
          width: '95%',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'fadeInUp 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '900', 
          background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '8px', 
          margin: 0,
          letterSpacing: '-1px',
        }}>
          {title}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px', marginTop: '8px' }}>
          Completa los datos de la canción
        </p>
        {children}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

interface FormData {
  titulo: string;
  artista: string;
  album: string;
  genero: string;
  duracion: string;
  imagen: string;
  audioUrl: string; /*agregado*/
  reproducciones: number;
  likes: number;
}

const SongsList = () => {
  const [songs, setSongs] = useState<Song[]>(MOCK_SONGS);

  const [filters, setFilters] = useState({
  search: '',
  genero: '',
  estado: 'todos',
});

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    artista: '',
    album: '',
    genero: '',
    duracion: '',
    imagen: '',
    audioUrl: '', /*agregado*/
    reproducciones: 0,
    likes: 0,
  });

  const handleViewDetails = (song: Song) => {
    setSelectedSong(song);
    setIsDetailModalOpen(true);
  };

  const handleAddSong = () => {
    setEditingSong(null);
    setFormData({
      titulo: '',
      artista: '',
      album: '',
      genero: '',
      duracion: '',
      imagen: '',
      audioUrl: '', /*agregado*/ 
      reproducciones: 0,
      likes: 0,
    });
    setIsFormModalOpen(true);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setFormData({
      titulo: song.titulo,
      artista: song.artista,
      album: song.album,
      genero: song.genero,
      duracion: song.duracion,
      imagen: song.imagen,
      audioUrl: song.audioUrl || '', /*agregado*/
      reproducciones: song.reproducciones,
      likes: song.likes,
    });
    setIsFormModalOpen(true);
  };

  const handleSaveSong = () => {
    if (!formData.titulo.trim() || !formData.artista.trim() || !formData.album.trim()) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    if (editingSong) {
      setSongs(
        songs.map((s) =>
          s.id === editingSong.id
            ? { ...s, ...formData, estado: s.estado }
            : s
        )
      );
    } else {
      const newSong: Song = {
        id: Math.max(...songs.map((s) => s.id), 0) + 1,
        ...formData,
        estado: 'activo',
      };
      setSongs([...songs, newSong]);
    }

    setIsFormModalOpen(false);
    setFormData({
      titulo: '',
      artista: '',
      album: '',
      genero: '',
      duracion: '',
      imagen: '',
      audioUrl: '', /*agregado*/
      reproducciones: 0,
      likes: 0,
    });
    setEditingSong(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
      setSongs(songs.filter((s) => s.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setSongs(
      songs.map((s) =>
        s.id === id ? { ...s, estado: s.estado === 'activo' ? 'inactivo' : 'activo' } : s
      )
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const filterInputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(30, 27, 75, 0.4)',
  border: '1px solid rgba(139, 92, 246, 0.3)',
  borderRadius: '10px',
  color: '#e2e8f0',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box' as const,
  cursor: 'pointer',
};
const filteredSongs = songs.filter((song) => {
  const search = filters.search.toLowerCase();

  const matchSearch = song.titulo.toLowerCase().includes(search);
  const matchGenero = filters.genero ? song.genero === filters.genero : true;
  const matchEstado = filters.estado === 'todos' ? true : song.estado === filters.estado;

  return matchSearch && matchGenero && matchEstado;
});

const uniqueGenres = Array.from(new Set(songs.map((s) => s.genero))).filter(Boolean);
const availableArtists = Array.from(new Set(songs.map(s => s.artista)));



  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #2d1b69 50%, #1a1f3a 75%, #0f172a 100%)',
        padding: '40px 30px',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: 'clamp(42px, 7vw, 64px)',
            fontWeight: '900',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-2px',
          }}
        >
          Gestión de Canciones
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#cbd5e1',
            fontWeight: '400',
            lineHeight: '1.6',
            maxWidth: '600px',
          }}
        >
          Administra el catálogo de canciones de la plataforma
        </p>
      </div>

      {/* Add Button */}
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={handleAddSong}
          style={{
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
          }}
        >
          <Icons.Plus /> Agregar Canción
        </button>
      </div>

      {/* Filters Section */}
<div
  style={{
    display: 'flex',
    gap: '16px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(12px)',
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
    alignItems: 'end'
  }}
>
  {/* Buscador de Canciones */}
<div style={{ flex: 2 }}>
  <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
    Buscar Canción
  </label>
  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
    {/* Icono posicionado absolutamente para que no estorbe al escribir */}
    <span style={{ 
      position: 'absolute', 
      left: '16px', 
      display: 'flex',
      color: '#8b5cf6',
      opacity: 0.7,
      pointerEvents: 'none' // Esto hace que el click pase a través del icono hacia el input
    }}>
      <Icons.Music />
    </span>
    
    <input
      placeholder="Escribe el nombre de la canción..."
      value={filters.search}
      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      style={{
        ...filterInputStyle,
        paddingLeft: '45px', // Espacio extra a la izquierda para el icono
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
    />
  </div>
</div>

  {/* Género */}
  <div>
    <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Género
    </label>
    <select
      value={filters.genero}
      onChange={(e) => setFilters({ ...filters, genero: e.target.value })}
      style={filterInputStyle}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
    >
      <option value="" style={{ background: '#1e1b4b' }}>Todos los géneros</option>
      {uniqueGenres.map((g) => (
        <option key={g} value={g} style={{ background: '#1e1b4b' }}>{g}</option>
      ))}
    </select>
  </div>

  {/* Estado */}
  <div>
    <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Estado
    </label>
    <select
      value={filters.estado}
      onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
      style={filterInputStyle}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
    >
      <option value="todos" style={{ background: '#1e1b4b' }}>Todos los estados</option>
      <option value="activo" style={{ background: '#1e1b4b' }}>Activas</option>
      <option value="inactivo" style={{ background: '#1e1b4b' }}>Inactivas</option>
    </select>
  </div>
</div>




      {/* Songs Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '30px',
        }}
      >
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            style={{
              background: 'rgba(30, 27, 75, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '15px',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(45, 27, 105, 0.6)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Image */}
            <div style={{ height: '180px', overflow: 'hidden', background: '#000' }}>
              <img
                src={song.imagen}
                alt={song.titulo}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>
                  {song.genero}
                </p>
                <h3 style={{ color: '#e2e8f0', margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700' }}>
                  {song.titulo}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '0' }}>
                  {song.artista}
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                <div style={{ flex: 1, background: 'rgba(139, 92, 246, 0.1)', padding: '6px', borderRadius: '6px', color: '#a78bfa', textAlign: 'center' }}>
                  <Icons.Play />
                  {formatNumber(song.reproducciones)}
                </div>
                <div style={{ flex: 1, background: 'rgba(236, 72, 153, 0.1)', padding: '6px', borderRadius: '6px', color: '#f472b6', textAlign: 'center' }}>
                  <Icons.Heart />
                  {formatNumber(song.likes)}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleViewDetails(song)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#a78bfa',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.color = '#c4b5fd';
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.color = '#a78bfa';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icons.Music />
                </button>
                <button
                  onClick={() => handleEditSong(song)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#a78bfa',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.color = '#c4b5fd';
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.color = '#a78bfa';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icons.Edit />
                </button>
                <button
                  onClick={() => toggleStatus(song.id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: song.estado === 'activo' ? '#22c55e' : '#ef4444',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = song.estado === 'activo' ? '#22c55e' : '#ef4444';
                    e.currentTarget.style.background = song.estado === 'activo' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icons.Lock />
                </button>
                <button
                  onClick={() => handleDelete(song.id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#fca5a5',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ef4444';
                    e.currentTarget.style.color = '#fecaca';
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    e.currentTarget.style.color = '#fca5a5';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icons.Trash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title={selectedSong?.titulo || ''}>
        {selectedSong && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <img
              src={selectedSong.imagen}
              alt={selectedSong.titulo}
              style={{
                width: '100%',
                borderRadius: '12px',
                maxHeight: '300px',
                objectFit: 'cover',
              }}
            />

            {/* Reproductor Ultra Minimalista */}
<div style={{ 
  marginTop: '25px',
  padding: '16px', 
  background: 'rgba(30, 27, 75, 0.3)', 
  borderRadius: '12px',
  border: '1px solid rgba(139, 92, 246, 0.1)'
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
    {/* Botón Play Circular */}
    <button style={{
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: '#8b5cf6',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>

    {/* Barra de Progreso */}
    <div style={{ flex: 1 }}>
      <div style={{ position: 'relative', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
        {/* Cuadrito morado al inicio (0%) */}
        <div style={{ 
          position: 'absolute', 
          left: '0', 
          top: '-4px',
          width: '12px', 
          height: '12px', 
          background: '#8b5cf6', 
          borderRadius: '2px',
          boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)'
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        <span style={{ color: '#e2e8f0', fontSize: '11px', fontWeight: '600' }}>0:00</span>
        <span style={{ color: '#94a3b8', fontSize: '11px' }}>{selectedSong.duracion}</span>
      </div>
    </div>
  </div>

  {/* Título de la canción */}
  <div style={{ marginTop: '12px', color: '#e2e8f0', fontSize: '13px', fontWeight: '500', textAlign: 'left' }}>
    {selectedSong.titulo}
  </div>

  <audio src={selectedSong.audioUrl} />
</div>


            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>ARTISTA</p>
                <p style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedSong.artista}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>ÁLBUM</p>
                <p style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedSong.album}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>GÉNERO</p>
                <p style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedSong.genero}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>DURACIÓN</p>
                <p style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedSong.duracion}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>REPRODUCCIONES</p>
                <p style={{ color: '#22c55e', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {formatNumber(selectedSong.reproducciones)}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>LIKES</p>
                <p style={{ color: '#ec4899', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {formatNumber(selectedSong.likes)}
                </p>
              </div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', borderLeft: '3px solid #8b5cf6' }}>
              <p style={{ color: '#a78bfa', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>ESTADO</p>
              <p style={{ color: selectedSong.estado === 'activo' ? '#22c55e' : '#ef4444', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                {selectedSong.estado === 'activo' ? 'Activa' : 'Inactiva'}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={editingSong ? '✏️ Editar Canción' : '🎵 Nueva Canción'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Título */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Título *
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Nombre de la canción..."
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '15px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Artista */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Artista *
            </label>
            <select
              value={formData.artista}
              onChange={(e) => setFormData({ ...formData, artista: e.target.value })}
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '15px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="" style={{ background: '#1e1b4b' }}>Selecciona un artista...</option>
              {availableArtists.map((artist) => (
                <option key={artist} value={artist} style={{ background: '#1e1b4b' }}>
                  {artist}
                </option>
              ))}
            </select>
          </div>

          {/* Álbum */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Álbum *
            </label>
            <input
              type="text"
              value={formData.album}
              onChange={(e) => setFormData({ ...formData, album: e.target.value })}
              placeholder="Nombre del álbum..."
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '15px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Género y Duración */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Género
              </label>
              <input
                type="text"
                value={formData.genero}
                onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                placeholder="Rock, Pop, Jazz..."
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '15px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1.5px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Duración
              </label>
              <input
                type="text"
                placeholder="3:45"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '15px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1.5px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* URL de Imagen */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              URL de Imagen
            </label>
            <input
              type="text"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              placeholder="https://example.com/imagen.jpg"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '15px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Link de Audio */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Link de Audio
            </label>
            <input
              type="text"
              placeholder="https://example.com/audio.mp3"
              value={formData.audioUrl}
              onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '15px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Reproducciones y Likes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Reproducciones
              </label>
              <input
                type="number"
                value={formData.reproducciones}
                onChange={(e) => setFormData({ ...formData, reproducciones: parseInt(e.target.value) || 0 })}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '15px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1.5px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Likes
              </label>
              <input
                type="number"
                value={formData.likes}
                onChange={(e) => setFormData({ ...formData, likes: parseInt(e.target.value) || 0 })}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '15px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1.5px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 1)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '32px', borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}>
            <button
              onClick={() => setIsFormModalOpen(false)}
              style={{
                flex: 1,
                padding: '14px 24px',
                backgroundColor: 'rgba(30, 27, 75, 0.5)',
                color: '#cbd5e1',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(30, 27, 75, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.backgroundColor = 'rgba(30, 27, 75, 0.5)';
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveSong}
              style={{
                flex: 1,
                padding: '14px 24px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#a78bfa';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#8b5cf6';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {editingSong ? <Icons.Edit /> : <Icons.Plus />}
              {editingSong ? 'Actualizar Canción' : 'Agregar Canción'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SongsList;
