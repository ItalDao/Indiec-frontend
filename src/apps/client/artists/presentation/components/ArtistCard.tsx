import { Card } from '../../../../../shared/ui'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ArtistCardProps {
  artist: any;
  viewMode?: 'grid' | 'list';
}

export const ArtistCard = ({ artist, viewMode = 'grid' }: ArtistCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const artistId = artist._id || artist.id;
  const genres = artist.generos || (artist.genero ? [artist.genero] : []);
  const artistName = artist.nombre || '';
  const artistPhoto = artist.foto || 'https://placehold.co/400x600/1e293b/ec4899?text=Artist';
  const artistCity = artist.ciudad || '';
  const artistCountry = artist.pais || 'EC';
  const artistPopularity = artist.popularidad || 5;

  if (viewMode === 'list') {
    return (
      <Card className="bg-[#1E293B]/40 border border-white/5 overflow-hidden rounded-2xl group transition-all duration-300 hover:bg-[#1E293B]/60 hover:border-[#8B5CF6]/30">
        <div className="flex items-center gap-6 p-4">
          {/* Imagen Compacta */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src={artistPhoto} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt={artistName}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[#0F172A] animate-pulse" />
            )}
          </div>

          {/* Info Principal */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2 truncate">
              {artistName}
            </h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {genres.slice(0, 3).map((genre: string, index: number) => (
                <span key={index} className="text-[10px] px-2 py-1 bg-[#8B5CF6]/20 text-[#A78BFA] rounded-full font-bold">
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-bold">
              <span>📍 {artistCity ? `${artistCity}, ` : ''}{artistCountry}</span>
              <span className="text-[#EC4899]">⭐ {artistPopularity}</span>
            </div>
          </div>

          {/* Botón Compacto */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/client/artists/${artistId}`);
            }}
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all shadow-lg hover:shadow-[#8B5CF6]/20 active:scale-95 flex-shrink-0"
          >
            Ver →
          </button>
        </div>
      </Card>
    );
  }

  // Vista Grid (Original mejorada)
  return (
    <Card className="bg-[#1E293B]/40 border border-white/5 overflow-hidden p-0 rounded-3xl group transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B5CF6]/10 hover:border-[#8B5CF6]/30 hover:-translate-y-2">
      {/* Contenedor de Imagen con Badge de Popularidad */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={artistPhoto} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={artistName}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#0F172A] animate-pulse" />
        )}
        
        {/* Gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent opacity-90" />
        
        {/* Badge de popularidad flotante */}
        <div className="absolute top-4 right-4 bg-[#EC4899] text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-lg backdrop-blur-sm">
          <span>⭐</span>
          <span>{artistPopularity}</span>
        </div>

        {/* País en la esquina */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
          <span>📍</span>
          <span>{artistCity ? `${artistCity}, ` : ''}{artistCountry}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-3 line-clamp-1">
          {artistName}
        </h3>
        
        {/* Géneros musicales */}
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.slice(0, 3).map((genre: string, index: number) => (
            <span 
              key={index} 
              className="text-[10px] px-3 py-1 bg-[#8B5CF6]/20 text-[#A78BFA] rounded-full font-bold uppercase tracking-wider transition-colors group-hover:bg-[#8B5CF6]/30"
            >
              {genre}
            </span>
          ))}
          {genres.length > 3 && (
            <span className="text-[10px] px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full font-bold">
              +{genres.length - 3}
            </span>
          )}
        </div>

        {/* Botón de acción principal */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/client/artists/${artistId}`);
          }}
          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7C3AED] hover:to-[#DB2777] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-[#8B5CF6]/30 active:scale-95 relative overflow-hidden group/btn"
        >
          <span className="relative z-10">Ver Perfil Completo →</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </Card>
  );
};