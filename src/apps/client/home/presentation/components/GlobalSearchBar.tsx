import { useEffect, useState } from "react";
import type { HomeRepository } from "../../domain/repositories/HomeRepository";
import { HomeMockRepository } from "../../mocks/HomeMockRepository";
import { Icons } from '../../../songs/presentation/components/Icons';

import ArtistCard from "./ArtistCard";
import SongCard from "./SongCard";
import EventCard from "./EventCard";
import ProductCard from "./ProductCard";

const defaultRepository: HomeRepository = new HomeMockRepository();

export default function GlobalSearchBar({
  repository = defaultRepository,
}: {
  repository?: HomeRepository;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Awaited<
    ReturnType<HomeRepository["searchGlobal"]>
  > | null>(null);

  const executeSearch = async () => {
    if (!query.trim()) {
      setResults(null);
      return;
    }
    const data = await repository.searchGlobal(query);
    setResults(data);
  };

  // Búsqueda automática al escribir
  useEffect(() => {
    executeSearch();
  }, [query]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* INPUT + LUPA */}
      <div style={styles.inputWrapper}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artistas, canciones, eventos, productos..."
          style={styles.input}
        />
        <button
          type="button"
          onClick={executeSearch}
          style={styles.searchButton}
          title="Buscar"
        >
          <Icons.Search />
        </button>
      </div>

      {/* RESULTADOS */}
      {results && (
        <div style={styles.dropdown}>
          
          {results.artists.length > 0 && (
            <>
              <h4 style={styles.sectionTitle}>Artistas</h4>
              {results.artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </>
          )}

          {results.songs.length > 0 && (
            <>
              <h4 style={styles.sectionTitle}>Canciones</h4>
              {results.songs.map((song) => {
                const formatDuration = (seconds: number) => {
                  const mins = Math.floor(seconds / 60);
                  const secs = seconds % 60;
                  return `${mins}:${secs.toString().padStart(2, '0')}`;
                };
                
                return (
                  <SongCard
                    key={song.id}
                    song={{
                      id: song.id,
                      titulo: song.titulo,
                      artista: song.artista?.nombre || 'Artista desconocido',
                      duracion: formatDuration(song.duracion),
                    }}
                  />
                );
              })}
            </>
          )}

          {results.events.length > 0 && (
            <>
              <h4 style={styles.sectionTitle}>Eventos</h4>
              {results.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    id: event.id,
                    nombre: event.titulo,
                    fecha: event.fecha,
                    lugar: event.lugar,
                    imagen: event.imagen,
                    precioEntrada: event.precioEntrada,
                  }}
                />
              ))}
            </>
          )}

          {results.products.length > 0 && (
            <>
              <h4 style={styles.sectionTitle}>Productos</h4>
              {results.products.map((product) => (
                <ProductCard
                  key={product.idRopa}
                  product={{
                    id: product.idRopa,
                    nombre: product.nombre,
                    precio: 0, // El modelo no tiene precio, usar valor por defecto
                    imagen: undefined,
                    talla: product.talla,
                    descuento: undefined,
                  }}
                />
              ))}
            </>
          )}

          {/* SIN RESULTADOS */}
          {results.artists.length === 0 &&
            results.songs.length === 0 &&
            results.events.length === 0 &&
            results.products.length === 0 && (
              <p style={styles.empty}>No se encontraron resultados</p>
            )}
        </div>
      )}
    </div>
  );
}

const styles = {
  inputWrapper: {
    position: "relative" as const,
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "0.7rem 2.5rem 0.7rem 1.2rem",
    borderRadius: "10px",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    background: "rgba(30, 27, 75, 0.5)",
    backdropFilter: "blur(10px)",
    color: "#F1F5F9",
    outline: "none",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  searchButton: {
    position: "absolute" as const,
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    color: "#8b5cf6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    transition: "all 0.2s ease",
  },
  dropdown: {
    position: "absolute" as const,
    top: "110%",
    width: "100%",
    maxHeight: "480px",
    overflowY: "auto" as const,
    background: "#1E293B",
    borderRadius: "16px",
    padding: "1rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    zIndex: 200,
  },
  sectionTitle: {
    margin: "0.75rem 0 0.25rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#94A3B8",
    textTransform: "uppercase" as const,
  },
  empty: {
    padding: "0.75rem",
    color: "#94A3B8",
    textAlign: "center" as const,
  },
};
