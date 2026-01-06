import { useState } from 'react';
import { MOCK_ARTISTS, type Artist } from '../../data/artists.mock';
import { Icons } from '../../../songs/presentation/components/Icons';

export const ArtistListPage = () => {
  const [artists] = useState<Artist[]>(MOCK_ARTISTS);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = Array.from(new Set(artists.map((a) => a.genero))).sort();

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch = artist.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || artist.genero === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleViewDetails = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsDetailOpen(true);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

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
            fontSize: 'clamp(24px, 5vw, 48px)',
            fontWeight: '700',
            color: '#e2e8f0',
            marginBottom: '10px',
            margin: '0 0 10px 0',
          }}
        >
          Artistas
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '16px', margin: 0 }}>
          Descubre talento independiente de todo el mundo
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '30px',
        }}
      >
        <div>
          <label style={{ display: 'block', color: '#8b5cf6', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
            Buscar artista
          </label>
          <input
            type="text"
            placeholder="Nombre del artista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 27, 75, 0.5)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '10px',
              color: '#e2e8f0',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              fontSize: '14px',
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

        <div>
          <label style={{ display: 'block', color: '#8b5cf6', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
            Género
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 27, 75, 0.5)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '10px',
              color: '#e2e8f0',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
            }}
          >
            <option value="">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div
            style={{
              padding: '8px 16px',
              background: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '8px',
              color: '#a78bfa',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {filteredArtists.length} artista{filteredArtists.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Artists Grid */}
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
            <div style={{ height: '200px', overflow: 'hidden', background: '#000', position: 'relative' }}>
              <img
                src={artist.imagen}
                alt={artist.nombre}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {artist.verificado && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#8b5cf6',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '16px',
                  }}
                >
                  <Icons.Check />
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>
                  {artist.genero} • {artist.pais}
                </p>
                <h3 style={{ color: '#e2e8f0', margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700' }}>
                  {artist.nombre}
                </h3>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '8px', borderRadius: '6px', color: '#a78bfa', textAlign: 'center', fontSize: '12px', fontWeight: '600' }}>
                  <Icons.Mic2 /> {formatNumber(artist.seguidores)}
                </div>
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '8px', borderRadius: '6px', color: '#a78bfa', textAlign: 'center', fontSize: '12px', fontWeight: '600' }}>
                  <Icons.Music2 /> {artist.cancionesTotales}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.4', margin: 0 }}>
                {artist.descripcion.substring(0, 60)}...
              </p>

              {/* Action Button */}
              <button
                onClick={() => handleViewDetails(artist)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
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
                Ver Perfil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {isDetailOpen && selectedArtist && (
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
          onClick={() => setIsDetailOpen(false)}
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
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#e2e8f0', marginBottom: '24px', margin: 0 }}>
              {selectedArtist.nombre}
            </h2>

            <img
              src={selectedArtist.imagen}
              alt={selectedArtist.nombre}
              style={{
                width: '100%',
                borderRadius: '12px',
                maxHeight: '300px',
                objectFit: 'cover',
                marginBottom: '24px',
              }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>GÉNERO</p>
                <p style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedArtist.genero}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>PAÍS</p>
                <p style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedArtist.pais}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>SEGUIDORES</p>
                <p style={{ color: '#22c55e', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {formatNumber(selectedArtist.seguidores)}
                </p>
              </div>
              <div>
                <p style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>CANCIONES</p>
                <p style={{ color: '#22c55e', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {selectedArtist.cancionesTotales}
                </p>
              </div>
            </div>

            <div style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', borderLeft: '3px solid #8b5cf6', marginBottom: '24px' }}>
              <p style={{ color: '#a78bfa', fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0' }}>ACERCA DE</p>
              <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {selectedArtist.descripcion}
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <button
                onClick={() => setIsDetailOpen(false)}
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
                Cerrar
              </button>
              <button
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
                <Icons.Heart /> Seguir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};