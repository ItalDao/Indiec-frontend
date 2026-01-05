
import HeroCarousel from '../components/HeroCarousel';
import SectionTitle from '../components/SectionTitle';
import InfiniteCarousel from '../components/InfiniteCarousel'; 
import ArtistCard from '../../../home/presentation/components/ArtistCard';
import SongCard from '../../../home/presentation/components/SongCard';
import EventCard from '../../../home/presentation/components/EventCard';
import ProductCard from '../../../home/presentation/components/ProductCard';
import { useHome } from "../hooks/useHome";
// --- Tipos de Datos (se mantienen igual) ---


const HomePage = () => {
  const { data, loading } = useHome();

  if (loading) {
    return (
      <div
        style={{
          background: "#0f172a",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Cargando contenido...
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      style={{
        paddingBottom: "4rem",
        background: "#0f172a",
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
              "https://static.wixstatic.com/media/8dd756_854a64867b8047d595bb24208e65c8df~mv2.jpeg",
            type: "song",
          },
          {
            id: "h2",
            title: "Festival Indie",
            subtitle: "Entradas disponibles",
            image:
              "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
            type: "event",
          },
        ]}
      />

      {/* 🎤 ARTISTAS */}
      {data.featuredArtists.length > 0 && (
        <div style={{ marginTop: "5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
            <SectionTitle title="Artistas destacados" />
          </div>

          <InfiniteCarousel speed={45} direction="left">
            {data.featuredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </InfiniteCarousel>
        </div>
      )}

      {/* 🎵 CANCIONES */}
      {data.trendingSongs.length > 0 && (
        <div style={{ marginTop: "5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
            <SectionTitle title="Nuevas canciones" />
          </div>

          <InfiniteCarousel speed={35} direction="right">
            {data.trendingSongs.map((song) => (
              <SongCard
                key={song.id}
                song={{
                  id: song.id,
                  titulo: song.titulo,
                  artista: song.artista?.nombre ?? "Desconocido",
                  
                }}
              />
            ))}
          </InfiniteCarousel>
        </div>
      )}

      {/* 📅 EVENTOS */}
      {data.upcomingEvents.length > 0 && (
        <div style={{ marginTop: "5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
            <SectionTitle title="Próximos eventos" />
          </div>

          <InfiniteCarousel speed={50} direction="left">
            {data.upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={{
                  id: event.id,
                  nombre: event.titulo,
                  fecha: event.fecha,
                  lugar: event.lugar,
                  imagen: event.imagen,
                }}
              />
            ))}
          </InfiniteCarousel>
        </div>
      )}

      {/* 👕 MERCH */}
      {data.recommendedProducts.length > 0 && (
        <div style={{ marginTop: "5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
            <SectionTitle title="Merch recomendado" />
          </div>

          <InfiniteCarousel speed={40} direction="right">
            {data.recommendedProducts.map((product) => (
              <ProductCard
                key={product.idRopa}
                product={{
                  id: product.idRopa,
                  nombre: product.nombre,
                  precio: product.precio ?? 0,
                  
                  talla: product.talla,
                }}
              />
            ))}
          </InfiniteCarousel>
        </div>
      )}
    </div>
  );
};

export default HomePage;