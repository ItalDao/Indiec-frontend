import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { artistApi } from '../../infrastructure/api/artistApi';
import type { Artist, Song, Event, MerchProduct } from '../../domain/models/Artist';

type TabType = 'canciones' | 'eventos' | 'merch';

export const ArtistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [merch, setMerch] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('canciones');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadArtistData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Backend calls - using mock data fallback
        const artistData = await artistApi.getArtistById(id);
        setArtist(artistData);
        // await artistApi.incrementPopularity(id);

        const [songsData, eventsData, merchData] = await Promise.all([
          artistApi.getArtistSongs(id),
          artistApi.getArtistEvents(id),
          artistApi.getArtistMerch(id)
        ]);

        setSongs(songsData);
        setEvents(eventsData);
        setMerch(merchData);
      } catch (error) {
        console.error('[ARTIST_DETAIL] Error loading artist data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtistData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#8B5CF6] font-black italic text-2xl animate-pulse">CARGANDO...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-2xl font-black mb-4">Artista no encontrado</p>
          <button
            onClick={() => navigate('/client/artists')}
            className="bg-[#8B5CF6] text-white px-6 py-3 rounded-xl font-bold"
          >
            Volver a Artistas
          </button>
        </div>
      </div>
    );
  }

  const genres = artist.generos || (artist.genero ? [artist.genero] : []);

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={artist.foto || 'https://placehold.co/1920x1080/1e293b/ec4899?text=Artist'}
            alt={artist.nombre}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="absolute inset-0 bg-[#0F172A] animate-pulse" />}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]"></div>
        </div>

        <button
          onClick={() => navigate('/client/artists')}
          className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition-all z-10 group"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-[#EC4899] text-white rounded-full text-xs font-black flex items-center gap-2">
                <span>★</span>
                <span>{artist.popularidad || 5}</span>
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-bold">
                📍 {artist.ciudad ? `${artist.ciudad}, ` : ''}{artist.pais || 'EC'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-4">
              {artist.nombre}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {genres.map((gen, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-[#8B5CF6]/30 backdrop-blur-md text-[#A78BFA] rounded-full text-sm font-bold uppercase"
                >
                  {gen}
                </span>
              ))}
            </div>

            {artist.redesSociales && (
              <div className="flex gap-3">
                {artist.redesSociales.instagram && (
                  <a href={artist.redesSociales.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#8B5CF6] transition-all group">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {artist.redesSociales.spotify && (
                  <a href={artist.redesSociales.spotify} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#1DB954] transition-all">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                )}
                {artist.redesSociales.youtube && (
                  <a href={artist.redesSociales.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#FF0000] transition-all">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93$.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12 bg-[#1E293B]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 flex items-center gap-3">
            <span style={{ fontSize: '24px' }}>📖</span>
            Biography
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {artist.biografia || 'No biography available for this artist.'}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex gap-4 border-b border-white/10">
            <button onClick={() => setActiveTab('canciones')} className={`pb-4 px-6 font-black text-sm uppercase tracking-wider transition-all relative ${activeTab === 'canciones' ? 'text-[#8B5CF6]' : 'text-gray-400 hover:text-white'}`}>
              Songs
              {activeTab === 'canciones' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-t-full"></div>}
            </button>
            <button onClick={() => setActiveTab('eventos')} className={`pb-4 px-6 font-black text-sm uppercase tracking-wider transition-all relative ${activeTab === 'eventos' ? 'text-[#8B5CF6]' : 'text-gray-400 hover:text-white'}`}>
              Events
              {activeTab === 'eventos' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-t-full"></div>}
            </button>
            <button onClick={() => setActiveTab('merch')} className={`pb-4 px-6 font-black text-sm uppercase tracking-wider transition-all relative ${activeTab === 'merch' ? 'text-[#8B5CF6]' : 'text-gray-400 hover:text-white'}`}>
              Merch
              {activeTab === 'merch' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-t-full"></div>}
            </button>
          </div>
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'canciones' && (
            <div className="space-y-4 animate-fade-in">
              {songs.length === 0 ? (
                <div className="text-center py-20 bg-[#1E293B]/20 rounded-3xl border border-white/5">
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎵</div>
                  <p className="text-gray-400 text-lg">No songs available</p>
                </div>
              ) : (
                songs.map((song, index) => (
                  <div key={song.id} className="bg-[#1E293B]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:bg-[#1E293B]/60 hover:border-[#8B5CF6]/30 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="text-2xl font-black text-[#8B5CF6] w-8">{index + 1}</div>
                      {/* HE MANTENIDO LA IMAGEN AQUÍ */}
                      {song.cover && (
                        <img src={song.cover} alt={song.titulo} className="w-16 h-16 rounded-xl object-cover" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-white font-black text-lg mb-1">{song.titulo}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>⏱️ {song.duracion}</span>
                          {song.album && <span>💿 {song.album}</span>}
                          {song.reproducciones && <span>▶️ {song.reproducciones.toLocaleString()} plays</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* BOTÓN SPOTIFY FUNCIONAL */}
                        {song.urlReproduccion && (
                          <a href={song.urlReproduccion} target="_blank" rel="noopener noreferrer" className="bg-[#1DB954] hover:bg-[#1ed760] text-white p-3 rounded-xl transition-all active:scale-95">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                          </a>
                        )}
                        {/* BOTÓN YOUTUBE FUNCIONAL */}
                        {song.urlVideo && (
                          <a href={song.urlVideo} target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] hover:bg-[#cc0000] text-white p-3 rounded-xl transition-all active:scale-95">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'eventos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {events.length === 0 ? (
                <div className="col-span-2 text-center py-20 bg-[#1E293B]/20 rounded-3xl border border-white/5">
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎤</div>
                  <p className="text-gray-400 text-lg">No upcoming events</p>
                </div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="bg-[#1E293B]/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-[#8B5CF6]/30 transition-all group">
                    {event.imagen && (
                      <div className="h-48 overflow-hidden">
                        <img src={event.imagen} alt={event.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-black text-white mb-2">{event.nombre}</h3>
                          <p className="text-sm text-gray-400">📅 {new Date(event.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        {event.precio && <div className="bg-[#EC4899] text-white px-4 py-2 rounded-full font-black text-sm">${event.precio}</div>}
                      </div>
                      <p className="text-gray-300 mb-4">📍 {event.lugar}, {event.ciudad}, {event.pais}</p>
                      {event.urlTickets && <a href={event.urlTickets} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-xl font-black text-sm uppercase tracking-wider text-center transition-all">Buy Tickets →</a>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'merch' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {merch.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-[#1E293B]/20 rounded-3xl border border-white/5">
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
                  <p className="text-gray-400 text-lg">No merchandise products available</p>
                </div>
              ) : (
                merch.map((product) => (
                  <div key={product.id} className="bg-[#1E293B]/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-[#8B5CF6]/30 transition-all group">
                    <div className="relative h-64 overflow-hidden bg-[#0F172A]">
                      <img src={product.imagen} alt={product.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {product.stock !== undefined && product.stock < 5 && <div className="absolute top-4 right-4 bg-[#EC4899] text-white px-3 py-1 rounded-full text-xs font-black">¡Últimos {product.stock}!</div>}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-black text-white flex-1">{product.nombre}</h3>
                        <div className="text-2xl font-black text-[#8B5CF6]">${product.precio}</div>
                      </div>
                      {product.descripcion && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.descripcion}</p>}
                      <button disabled={product.stock === 0} className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all active:scale-95">
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};