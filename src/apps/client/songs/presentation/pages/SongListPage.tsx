import { useState } from 'react';
import { useSongs } from '../hooks/useSongs';
import { SongCard } from '../components/SongCard.tsx';
import { SongFiltersComponent } from '../components/SongFilters.tsx';
import { colors } from '../../../../../shared/theme/colors';
import type { SongFilters } from '../../domain/models/Song';

export const SongListPage = () => {
  const [filters, setFilters] = useState<SongFilters>({});
  const { songs, loading, error } = useSongs(filters);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.5rem',
        color: colors.textMuted 
      }}>
         Cargando canciones...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem',
        color: colors.error 
      }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}> </p>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Error al cargar</h2>
        <p style={{ color: colors.textMuted }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 
          style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800',
            marginBottom: '0.5rem',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
           Catálogo de Canciones
        </h1>
        <p style={{ fontSize: '1rem', color: colors.textSecondary }}>
          Descubre música independiente de artistas emergentes
        </p>
      </div>

      <SongFiltersComponent 
        onFilter={setFilters}
        onReset={() => setFilters({})}
      />

      <div style={{ 
        marginBottom: '1.5rem',
        color: colors.textMuted,
        fontSize: '0.875rem'
      }}>
        {songs.length} cancion{songs.length !== 1 ? 'es' : ''} encontrada{songs.length !== 1 ? 's' : ''}
      </div>

      {songs.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem',
          color: colors.textMuted 
        }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}> </p>
          <p>No se encontraron canciones con estos filtros</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};
