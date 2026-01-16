
import HeroCarousel from '../components/HeroCarousel';
import InfiniteCarousel from '../components/InfiniteCarousel'; 
import ArtistCard from '../../../home/presentation/components/ArtistCard';
import SongCard from '../../../home/presentation/components/SongCard';
import EventCard from '../../../home/presentation/components/EventCard';
import ProductCard from '../../../home/presentation/components/ProductCard';
import { useHome } from "../hooks/useHome";
import { ArtistIcon, SongIcon, EventIcon, ProductIcon } from '../components/SectionIcons';

// Componente de skeleton loading
const SkeletonLoader = ({ count = 3 }: { count?: number }) => (
  <div style={{ display: 'flex', gap: '1.5rem', padding: '0 2rem', overflowX: 'auto' }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          width: '280px',
          minWidth: '280px',
          height: '320px',
          borderRadius: '16px',
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(139, 92, 246, 0.1) 100%)',
          backgroundSize: '200% 100%',
          animation: 'pulse 2s infinite',
        }}
      />
    ))}
    <style>
      {`@keyframes pulse {
        0%, 100% { background-position: 200% 0; }
        50% { background-position: -200% 0; }
      }`}
    </style>
  </div>
);

const HomePage = () => {
  const { data, loading } = useHome();

  return (
    <div
      style={{
        paddingBottom: "4rem",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
        backgroundAttachment: "fixed",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* 🎯 HERO */}
      <HeroCarousel
        data={[
          {
            id: "h1",
            title: "Nuevo álbum",
            subtitle: "Escucha ahora",
            image:
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=400&fit=crop",
            type: "song",
          },
          {
            id: "h2",
            title: "Festival Indie",
            subtitle: "Entradas disponibles",
            image:
              "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop",
            type: "event",
          },
        ]}
      />

      {/* 🎤 ARTISTAS */}
      <section style={{ marginTop: "6rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1rem", 
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "2px solid rgba(139, 92, 246, 0.3)"
          }}>
            <div style={{ color: "#8b5cf6", display: "flex" }}>
              <ArtistIcon />
            </div>
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0, letterSpacing: "-0.5px" }}>Artistas destacados</h2>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", margin: "0.5rem 0 0 0", fontWeight: "500" }}>Descubre los mejores artistas indie</p>
            </div>
          </div>
        </div>

        {loading || !data?.featuredArtists.length ? (
          <SkeletonLoader count={4} />
        ) : (
          <InfiniteCarousel speed={45} direction="left">
            {data.featuredArtists.map((artist) => (
              <ArtistCard 
                key={artist.id} 
                artist={{
                  ...artist,
                  foto: artist.foto || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
                }} 
              />
            ))}
          </InfiniteCarousel>
        )}
      </section>

      {/* 🎵 CANCIONES */}
      <section style={{ marginTop: "6rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1rem", 
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "2px solid rgba(139, 92, 246, 0.3)"
          }}>
            <div style={{ color: "#8b5cf6", display: "flex" }}>
              <SongIcon/>
            </div>
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0, letterSpacing: "-0.5px" }}>Nuevas canciones</h2>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", margin: "0.5rem 0 0 0", fontWeight: "500" }}>Los estrenos más esperados</p>
            </div>
          </div>
        </div>

        {loading || !data?.trendingSongs.length ? (
          <SkeletonLoader count={4} />
        ) : (
          <InfiniteCarousel speed={35} direction="right">
            {data.trendingSongs.map((song) => (
              <SongCard
                key={song.id}
                song={{
                  id: song.id,
                  titulo: song.titulo,
                  artista: song.artista?.nombre ?? "Desconocido",
                  portada: song.imagen || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
                }}
              />
            ))}
          </InfiniteCarousel>
        )}
      </section>

      {/* 📅 EVENTOS */}
      <section style={{ marginTop: "6rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1rem", 
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "2px solid rgba(139, 92, 246, 0.3)"
          }}>
            <div style={{ color: "#8b5cf6", display: "flex" }}>
              <EventIcon />
            </div>
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0, letterSpacing: "-0.5px" }}>Próximos eventos</h2>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", margin: "0.5rem 0 0 0", fontWeight: "500" }}>Vive la experiencia en vivo</p>
            </div>
          </div>
        </div>

        {loading || !data?.upcomingEvents.length ? (
          <SkeletonLoader count={4} />
        ) : (
          <InfiniteCarousel speed={50} direction="left">
            {data.upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={{
                  id: event.id,
                  nombre: event.titulo,
                  fecha: event.fecha,
                  lugar: event.lugar,
                  imagen: event.imagen || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
                }}
              />
            ))}
          </InfiniteCarousel>
        )}
      </section>

      {/* 👕 MERCH */}
      <section style={{ marginTop: "6rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1rem", 
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "2px solid rgba(139, 92, 246, 0.3)"
          }}>
            <div style={{ color: "#8b5cf6", display: "flex" }}>
              <ProductIcon />
            </div>
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0, letterSpacing: "-0.5px" }}>Merch recomendado</h2>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", margin: "0.5rem 0 0 0", fontWeight: "500" }}>Productos exclusivos de tus artistas favoritos</p>
            </div>
          </div>
        </div>

        {loading || !data?.recommendedProducts.length ? (
          <SkeletonLoader count={4} />
        ) : (
          <InfiniteCarousel speed={40} direction="right">
            {data.recommendedProducts.map((product) => (
              <ProductCard
                key={product.idRopa}
                product={{
                  id: product.idRopa,
                  nombre: product.nombre,
                  precio: product.precio ?? 0,
                  imagen: product.imagen || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
                  talla: product.talla,
                }}
              />
            ))}
          </InfiniteCarousel>
        )}
      </section>
    </div>
  );
};

export default HomePage;