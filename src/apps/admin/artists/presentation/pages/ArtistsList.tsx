import React, { useState } from 'react';
import { MOCK_ARTISTS } from '../../data/artists.mock';
import { Icons } from '../../../../client/songs/presentation/components/Icons';
import { QRCodeComponent } from '../../../../../shared/ui';
import { useAlert } from '../../../../../shared/hooks/useAlert';
import { AlertContainer } from '../../../../../shared/ui/AlertContainer';
import type { Artist } from '../../data/artists.mock';

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
          Completa los datos del artista
        </p>
        {children}
      </div>
    </div>
  );
};

export const ArtistsList: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>(MOCK_ARTISTS);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [artistIdAEliminar, setArtistIdAEliminar] = useState<number | null>(null);
  
  const { alerts, removeAlert, success, error: errorAlert, warning, info } = useAlert();

  const [filterName, setFilterName] = useState('');
  const [filterGenero, setFilterGenero] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    pais: '',
    email: '',
    imagen: '',
    seguidores: 0,
    biografia: '',
  });

  const handleViewDetails = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsDetailModalOpen(true);
  };

  const handleDownloadQR = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsQRModalOpen(true);
  };

  const handleAddArtist = () => {
    setEditingArtist(null);
    setFormData({
      nombre: '',
      genero: '',
      pais: '',
      email: '',
      imagen: '',
      seguidores: 0,
      biografia: '',
    });
    setIsFormModalOpen(true);
  };

  const handleEditArtist = (artist: Artist) => {
    setEditingArtist(artist);
    setFormData({
      nombre: artist.nombre,
      genero: artist.genero,
      pais: artist.pais,
      email: artist.email,
      imagen: artist.imagen,
      seguidores: artist.seguidores,
      biografia: artist.biografia,
    });
    setIsFormModalOpen(true);
  };

  const handleSaveArtist = () => {
    if (!formData.nombre || !formData.genero || !formData.pais || !formData.email) {
      errorAlert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    if (editingArtist) {
      // Actualizar artista existente
      setArtists(
        artists.map((a) =>
          a.id === editingArtist.id
            ? {
                ...a,
                nombre: formData.nombre,
                genero: formData.genero,
                pais: formData.pais,
                email: formData.email,
                imagen: formData.imagen || a.imagen,
                seguidores: formData.seguidores,
                biografia: formData.biografia,
              }
            : a
        )
      );
      success('Actualizado', 'Artista actualizado correctamente');
    } else {
      // Crear nuevo artista
      const newArtist: Artist = {
        id: Math.max(...artists.map(a => a.id), 0) + 1,
        nombre: formData.nombre,
        genero: formData.genero,
        pais: formData.pais,
        email: formData.email,
        imagen: formData.imagen || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
        seguidores: formData.seguidores,
        estado: 'activo',
        biografia: formData.biografia,
      };
      setArtists([...artists, newArtist]);
      success('Creado', 'Artista creado correctamente');
    }

    setIsFormModalOpen(false);
    setEditingArtist(null);
    setFormData({
      nombre: '',
      genero: '',
      pais: '',
      email: '',
      imagen: '',
      seguidores: 0,
      biografia: '',
    });
  };

  const handleDelete = (id: number) => {
    setArtistIdAEliminar(id);
    warning('¿Eliminar Artista?', 'Esta acción no se puede deshacer. El artista será eliminado permanentemente.');
  };

  const confirmarEliminarArtista = () => {
    if (artistIdAEliminar) {
      setArtists((prev) => prev.filter((a) => a.id !== artistIdAEliminar));
      success('Eliminado', 'Artista eliminado correctamente');
      setArtistIdAEliminar(null);
    }
  };

  const cancelarEliminarArtista = () => {
    info('Cancelado', 'Eliminación de artista cancelada');
    setArtistIdAEliminar(null);
  };

  const toggleStatus = (id: number) => {
    const artist = artists.find(a => a.id === id);
    setArtists((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, estado: a.estado === 'activo' ? 'inactivo' : 'activo' } : a
      )
    );
    const nuevoEstado = artist?.estado === 'activo' ? 'inactivo' : 'activo';
    success('Actualizado', `Artista marcado como ${nuevoEstado}`);
  };

  const filteredArtists = artists.filter((artist) => {
  return (
    artist.nombre.toLowerCase().includes(filterName.toLowerCase()) &&
    (filterGenero ? artist.genero === filterGenero : true) &&
    (filterEstado ? artist.estado === filterEstado : true)
  );
});


  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        paddingBottom: '60px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '60px' }}>
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
            Gestión de Artistas
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
            Administra y controla todos los artistas de la plataforma
          </p>
        </div>

        {/* BOTÓN AGREGAR */}
        <div style={{ marginBottom: '40px' }}>
          <button
            onClick={handleAddArtist}
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
            <Icons.Plus />
            Agregar Artista
          </button>
        </div>

        {/* ESTILOS DE LOS FILTROS */} 
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
  {/* Buscar Artista */}
  <div style={{ flex: 2 }}>
    <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Buscar Artista
    </label>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <span style={{ 
        position: 'absolute', 
        left: '16px', 
        display: 'flex',
        color: '#8b5cf6',
        opacity: 0.7,
        pointerEvents: 'none'
      }}>
        <Icons.Search />
      </span>
      
      <input
        placeholder="Escribe el nombre del artista..."
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px 12px 45px',
          background: 'rgba(30, 27, 75, 0.4)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '10px',
          color: '#e2e8f0',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box' as const,
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
      value={filterGenero}
      onChange={(e) => setFilterGenero(e.target.value)}
      style={{
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
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
    >
      <option value="" style={{ background: '#1e1b4b' }}>Todos los géneros</option>
      <option value="Rock" style={{ background: '#1e1b4b' }}>Rock</option>
      <option value="Pop" style={{ background: '#1e1b4b' }}>Pop</option>
      <option value="Jazz" style={{ background: '#1e1b4b' }}>Jazz</option>
      <option value="Indie" style={{ background: '#1e1b4b' }}>Indie</option>
      <option value="Electrónica" style={{ background: '#1e1b4b' }}>Electrónica</option>
      <option value="Reggaeton" style={{ background: '#1e1b4b' }}>Reggaeton</option>
    </select>
  </div>

  {/* Estado */}
  <div>
    <label style={{ display: 'block', color: '#8b5cf6', fontSize: '11px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Estado
    </label>
    <select
      value={filterEstado}
      onChange={(e) => setFilterEstado(e.target.value)}
      style={{
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
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)')}
    >
      <option value="" style={{ background: '#1e1b4b' }}>Todos los estados</option>
      <option value="activo" style={{ background: '#1e1b4b' }}>Activos</option>
      <option value="inactivo" style={{ background: '#1e1b4b' }}>Inactivos</option>
    </select>
  </div>
</div>



        {/* GRID DE ARTISTAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              style={{
                background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
              }}
            >
              {/* IMAGEN */}
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  background: '#1e1b4b',
                  overflow: 'hidden',
                  borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                }}
              >
                <img
                  src={artist.imagen}
                  alt={artist.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1)';
                  }}
                />
              </div>

              {/* CONTENIDO */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                {/* NOMBRE + ESTADO */}
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#fff',
                      margin: 0,
                      marginBottom: '8px',
                    }}
                  >
                    {artist.nombre}
                  </h3>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: artist.estado === 'activo' ? '#22c55e' : '#ef4444',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {artist.estado}
                  </span>
                </div>

                {/* INFO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                    <div style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>
                      <Icons.Music2 />
                    </div>
                    <span>{artist.genero}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                    <div style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>
                      <Icons.MapPin />
                    </div>
                    <span>{artist.pais}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icons.Heart />
                    </div>
                    <span style={{ fontWeight: '600' }}>{artist.seguidores.toLocaleString()}</span>
                  </div>
                </div>

                {/* ACCIONES */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                    marginTop: 'auto',
                  }}
                >
                  <button
                    onClick={() => handleViewDetails(artist)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'transparent',
                      color: '#8b5cf6',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icons.Music />
                    
                  </button>
                  <button
                    onClick={() => handleEditArtist(artist)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'transparent',
                      color: '#8b5cf6',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icons.Edit />
                   
                  </button>
                  <button
                    onClick={() => handleDownloadQR(artist)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'transparent',
                      color: '#06b6d4',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#06b6d4';
                      e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icons.FileText />
                  </button>
                  <button
                    onClick={() => toggleStatus(artist.id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'transparent',
                      color: artist.estado === 'activo' ? '#ef4444' : '#22c55e',
                      border: `1px solid ${artist.estado === 'activo' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = artist.estado === 'activo' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)';
                      e.currentTarget.style.background = artist.estado === 'activo' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = artist.estado === 'activo' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icons.Lock />
                    
                  </button>
                  <button
                    onClick={() => handleDelete(artist.id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'transparent',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#ef4444';
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
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
      </div>

      {/* MODAL DETALLES */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Detalles del Artista">
        {selectedArtist && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <img
              src={selectedArtist.imagen}
              alt={selectedArtist.nombre}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
            />

            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', margin: 0, marginBottom: '8px' }}>
                {selectedArtist.nombre}
              </h2>
              <span style={{ fontSize: '14px', color: '#8b5cf6', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {selectedArtist.genero}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
              }}
            >
              <div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '8px', textTransform: 'uppercase' }}>
                  País
                </p>
                <p style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: '600', margin: 0 }}>
                  {selectedArtist.pais}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '8px', textTransform: 'uppercase' }}>
                  Seguidores
                </p>
                <p style={{ fontSize: '16px', color: '#22c55e', fontWeight: '600', margin: 0 }}>
                  {selectedArtist.seguidores.toLocaleString()}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '8px', textTransform: 'uppercase' }}>
                  Email
                </p>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, wordBreak: 'break-all' }}>
                  {selectedArtist.email}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold', margin: 0, marginBottom: '8px', textTransform: 'uppercase' }}>
                  Estado
                </p>
                <span style={{ fontSize: '14px', color: selectedArtist.estado === 'activo' ? '#22c55e' : '#ef4444', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {selectedArtist.estado}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL QR */}
      <Modal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} title="Descargar QR del Artista">
        {selectedArtist && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>
              Descarga el código QR de <strong>{selectedArtist.nombre}</strong> para usar en materiales de marketing, redes sociales y promociones.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCodeComponent
                value={`ARTIST-${selectedArtist.id}-${selectedArtist.nombre}`}
                size={256}
                downloadFileName={`qr-${selectedArtist.nombre.replace(/\s+/g, '-')}.png`}
              />
            </div>
            <button
              onClick={() => setIsQRModalOpen(false)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>

      {/* MODAL FORMULARIO AGREGAR/EDITAR ARTISTA */}
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={editingArtist ? '✏️ Editar Artista' : '🎵 Nuevo Artista'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Nombre - Full Width */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Nombre del Artista *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: The Beatles, Bad Bunny..."
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

          {/* Género y País - 2 Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Género Musical *
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                País de Origen *
              </label>
              <input
                type="text"
                value={formData.pais}
                onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                placeholder="Colombia"
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

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Email del Artista *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="artist@example.com"
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

          {/* Biografía */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Biografía
            </label>
            <textarea
              value={formData.biografia}
              onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
              placeholder="Cuéntanos sobre el artista, sus logros, estilo musical..."
              rows={4}
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '15px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                color: '#e2e8f0',
                outline: 'none',
                resize: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'inherit',
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

          {/* Imagen URL y Seguidores */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Foto/Imagen del Artista
              </label>
              <input
                type="text"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                placeholder="https://example.com/foto.jpg"
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Seguidores
              </label>
              <input
                type="number"
                value={formData.seguidores}
                onChange={(e) => setFormData({ ...formData, seguidores: Number(e.target.value) })}
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
                padding: '14px 20px',
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
              onClick={handleSaveArtist}
              style={{
                flex: 1,
                padding: '14px 20px',
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
              {editingArtist ? <Icons.Edit /> : <Icons.Plus />}
              {editingArtist ? 'Actualizar Artista' : 'Crear Artista'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      {artistIdAEliminar && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(30, 20, 50, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            padding: '28px',
            maxWidth: '400px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              color: '#f59e0b',
              fontSize: '18px',
              fontWeight: '700',
            }}>¿Eliminar artista?</h3>
            <p style={{
              margin: '0 0 24px 0',
              color: '#cbd5e1',
              fontSize: '14px',
              lineHeight: '1.6',
            }}>Esta acción no se puede deshacer. El artista será eliminado permanentemente.</p>
            <div style={{
              display: 'flex',
              gap: '12px',
            }}>
              <button
                onClick={cancelarEliminarArtista}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  background: 'transparent',
                  color: '#8b5cf6',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminarArtista}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertContainer alerts={alerts} onRemove={removeAlert} />
    </div>
  );
};

export default ArtistsList;
