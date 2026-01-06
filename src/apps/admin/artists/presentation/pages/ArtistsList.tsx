import React, { useState } from 'react';
import { MOCK_ARTISTS } from '../../data/artists.mock';
import { Icons } from '../../../../client/songs/presentation/components/Icons';
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
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.95), rgba(45, 27, 105, 0.7))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          padding: '32px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#e2e8f0', marginBottom: '24px', margin: 0 }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export const ArtistsList: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>(MOCK_ARTISTS);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    pais: '',
    email: '',
    imagen: '',
    seguidores: 0,
  });

  const handleViewDetails = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsDetailModalOpen(true);
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
    });
    setIsFormModalOpen(true);
  };

  const handleSaveArtist = () => {
    if (!formData.nombre || !formData.genero || !formData.pais || !formData.email) {
      alert('Por favor completa todos los campos requeridos');
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
              }
            : a
        )
      );
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
      };
      setArtists([...artists, newArtist]);
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
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artista?')) {
      setArtists((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setArtists((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, estado: a.estado === 'activo' ? 'inactivo' : 'activo' } : a
      )
    );
  };

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

        {/* GRID DE ARTISTAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {artists.map((artist) => (
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
                    Ver
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
                    Editar
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
                    {artist.estado === 'activo' ? 'Desactivar' : 'Activar'}
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
                    Eliminar
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

      {/* MODAL FORMULARIO AGREGAR/EDITAR ARTISTA */}
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={editingArtist ? 'Editar Artista' : 'Agregar Nuevo Artista'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
              Nombre *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Nombre del artista"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '10px',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
                Género *
              </label>
              <input
                type="text"
                value={formData.genero}
                onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                placeholder="Rock, Pop, Jazz..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
                País *
              </label>
              <input
                type="text"
                value={formData.pais}
                onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                placeholder="Colombia"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="artist@example.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                background: 'rgba(30, 27, 75, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '10px',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
                Imagen URL
              </label>
              <input
                type="text"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                placeholder="https://..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
                Seguidores
              </label>
              <input
                type="number"
                value={formData.seguidores}
                onChange={(e) => setFormData({ ...formData, seguidores: Number(e.target.value) })}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background: 'rgba(30, 27, 75, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <button
              onClick={() => setIsFormModalOpen(false)}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: 'transparent',
                color: '#cbd5e1',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.color = '#8b5cf6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveArtist}
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
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
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
              {editingArtist ? <Icons.Edit /> : <Icons.Plus />}
              {editingArtist ? 'Actualizar Artista' : 'Crear Artista'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ArtistsList;
