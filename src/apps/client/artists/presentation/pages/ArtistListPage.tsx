import { useEffect, useState, useMemo } from 'react';
import { artistApi } from '../../infrastructure/api/artistApi';
import { ArtistCard } from '../components/ArtistCard';
import type { Artist, SortOption, ViewMode } from '../../domain/models/Artist';

export const ArtistListPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularidad');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await artistApi.getArtists();
        console.log('🎨 Artistas cargados:', data);
        console.log('📊 Total artistas:', data.length);
        setArtists(Array.isArray(data) ? data : []);
      } catch (e) { 
        console.error('❌ Error cargando artistas:', e); 
      } finally { 
        setLoading(false); 
      }
    };
    load();
  }, []);

  // Obtener listas únicas para filtros
  const availableGenres = useMemo(() => {
    const genresSet = new Set<string>();
    artists.forEach(a => {
      if (a.generos && Array.isArray(a.generos)) {
        a.generos.forEach(g => genresSet.add(g));
      } else if (a.genero) {
        genresSet.add(a.genero);
      }
    });
    return Array.from(genresSet).sort();
  }, [artists]);

  const availableCountries = useMemo(() => {
    const countries = new Set(artists.map(a => a.pais).filter(Boolean));
    return Array.from(countries).sort();
  }, [artists]);

  // Filtrado y ordenamiento mejorado
  const filteredAndSorted = useMemo(() => {
    return artists
      .filter(a => {
        const matchesSearch = a.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === '' || 
          (a.generos && a.generos.includes(selectedGenre)) ||
          a.genero === selectedGenre;
        const matchesCountry = selectedCountry === '' || a.pais === selectedCountry;
        
        return matchesSearch && matchesGenre && matchesCountry;
      })
      .sort((a, b) => {
        if (sortBy === 'popularidad') {
          return (b.popularidad || 0) - (a.popularidad || 0);
        }
        return a.nombre.localeCompare(b.nombre);
      });
  }, [artists, searchTerm, selectedGenre, selectedCountry, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSelectedCountry('');
    setSortBy('popularidad');
  };

  const activeFiltersCount = [searchTerm, selectedGenre, selectedCountry].filter(Boolean).length;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '64px', height: '64px', border: '4px solid #8B5CF6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ color: '#8B5CF6', fontWeight: 900, fontStyle: 'italic', fontSize: '24px', marginTop: '16px' }}>CARGANDO ARTISTAS...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', backgroundImage: 'radial-gradient(circle at top right, #1e1b4b, transparent)', padding: '2rem' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Mejorado con Animación */}
        <header className="mb-8 md:mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-[#8B5CF6] to-[#EC4899] rounded-full"></div>
            <h2 className="text-[#EC4899] font-black tracking-[0.5em] uppercase text-[10px]">Descubre Talento</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
              Artistas<span className="text-[#8B5CF6]">.</span>
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="font-bold">{filteredAndSorted.length} artistas</span>
              {activeFiltersCount > 0 && (
                <span className="px-3 py-1 bg-[#8B5CF6]/20 text-[#A78BFA] rounded-full text-xs font-bold">
                  {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} activo{activeFiltersCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Barra de Búsqueda Principal */}
        <div className="mb-6 relative">
          <input 
            type="text" 
            placeholder="🔍 Buscar artista por nombre..." 
            value={searchTerm}
            className="w-full bg-[#1E293B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 pl-12 text-sm font-bold text-white placeholder:text-gray-500 outline-none focus:ring-2 ring-[#8B5CF6]/50 transition-all shadow-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Panel de Filtros Avanzados */}
        <div className="mb-8 bg-[#0F172A]/50 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          {/* Header del Panel con toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="text-white font-black text-sm uppercase tracking-wider">Filtros Avanzados</span>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Contenido de Filtros */}
          <div className={`transition-all duration-300 overflow-hidden ${isFilterOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Filtro por Género */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Género Musical</label>
                <select 
                  value={selectedGenre}
                  className="w-full bg-[#1E293B] border border-white/10 rounded-xl p-3 text-xs font-bold text-white outline-none cursor-pointer hover:border-[#8B5CF6]/50 transition-colors"
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="">Todos los géneros</option>
                  {availableGenres.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por País */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">País</label>
                <select 
                  value={selectedCountry}
                  className="w-full bg-[#1E293B] border border-white/10 rounded-xl p-3 text-xs font-bold text-white outline-none cursor-pointer hover:border-[#8B5CF6]/50 transition-colors"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">Todos los países</option>
                  {availableCountries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Ordenar por */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Ordenar por</label>
                <select 
                  value={sortBy}
                  className="w-full bg-[#1E293B] border border-white/10 rounded-xl p-3 text-xs font-bold text-white outline-none cursor-pointer hover:border-[#8B5CF6]/50 transition-colors"
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <option value="popularidad">⭐ Más Populares</option>
                  <option value="nombre">🔤 A-Z</option>
                </select>
              </div>

              {/* Botón de limpiar filtros */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  disabled={activeFiltersCount === 0}
                  className="w-full bg-[#EC4899]/20 hover:bg-[#EC4899]/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#EC4899] py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all"
                >
                  ✕ Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle de Vista (Grid/Lista) */}
        <div className="mb-8 flex justify-end">
          <div className="inline-flex bg-[#1E293B]/80 backdrop-blur-xl rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                viewMode === 'grid' 
                  ? 'bg-[#8B5CF6] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                viewMode === 'list' 
                  ? 'bg-[#8B5CF6] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Lista
            </button>
          </div>
        </div>

        {/* Grid o Lista de Artistas */}
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-black text-white italic mb-2">No se encontraron artistas</p>
            <p className="text-gray-400 mb-6">Intenta ajustar tus filtros de búsqueda</p>
            <button
              onClick={clearFilters}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
            {filteredAndSorted.map((artist) => (
              <ArtistCard 
                key={artist._id || artist.id} 
                artist={artist} 
                viewMode={viewMode} 
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out backwards;
        }
      `}</style>
    </div>
  );
};