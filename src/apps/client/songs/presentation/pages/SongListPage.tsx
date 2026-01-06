// src/apps/client/songs/presentation/pages/SongListPage.tsx
import { useState } from 'react';
import { useSongs } from '../hooks/useSongs';
import { SongCard } from '../components/SongCard';
import { SongFiltersComponent } from '../components/SongFilters';
import { colors } from '../../../../../shared/theme/colors';
import type { SongFilters } from '../../domain/models/Song';
import { Icons } from '../components/Icons';

export const SongListPage = () => {
  const [filters, setFilters] = useState<SongFilters>({});
  const { songs, loading, error } = useSongs(filters);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '500px',
        gap: '20px',
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: `3px solid rgba(139, 92, 246, 0.2)`,
          borderTop: `3px solid ${colors.primary}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{
          fontSize: '15px',
          color: '#cbd5e1',
          fontWeight: '500',
        }}>
          Cargando canciones...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: '500px',
        margin: '60px auto',
        textAlign: 'center', 
        padding: '48px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
        borderRadius: '16px',
        border: `1px solid rgba(239, 68, 68, 0.3)`,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', color: colors.error, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icons.AlertCircle /></div>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#fff', fontWeight: '700', margin: 0 }}>Error al cargar</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '24px', margin: '12px 0 24px 0' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 28px',
            background: colors.error,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            boxShadow: `0 4px 12px ${colors.error}40`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 20px ${colors.error}60`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${colors.error}40`;
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px', position: 'relative', paddingTop: '20px' }}>
          {/* Background gradient accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100px',
            width: '400px',
            height: '300px',
            background: `radial-gradient(circle, ${colors.primary}15, transparent)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            filter: 'blur(40px)',
          }} />
          
          <h1 
            style={{ 
              fontSize: 'clamp(42px, 7vw, 64px)', 
              fontWeight: '900',
              marginBottom: '16px',
              color: '#fff',
              margin: 0,
              letterSpacing: '-2px',
              background: `linear-gradient(135deg, #fff 0%, ${colors.primary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `0 8px 32px ${colors.primary}40`,
            }}
          >
            Canciones
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            margin: '0px', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Descubre música independiente de artistas emergentes. El mejor talento indie en un solo lugar.
          </p>
        </div>

      {/* Filtros */}
      <SongFiltersComponent 
        onFilter={setFilters}
        onReset={() => setFilters({})}
      />

      {/* Resultado counter */}
      <div style={{ 
        marginBottom: '32px',
        fontSize: '14px',
        color: '#cbd5e1',
        fontWeight: '600',
        letterSpacing: '0.5px',
      }}>
        {songs.length} canción{songs.length !== 1 ? 'es' : ''} encontrada{songs.length !== 1 ? 's' : ''}
      </div>

      {/* Grid de canciones o mensaje vacío */}
      {songs.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '80px 20px',
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(45, 27, 105, 0.4))',
          borderRadius: '16px',
          border: `1px dashed rgba(139, 92, 246, 0.3)`,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '24px', 
            color: '#cbd5e1', 
            opacity: 0.5,
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Icons.Search />
          </div>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#fff', 
            marginBottom: '12px',
            margin: 0,
          }}>Sin resultados</h3>
          <p style={{
            fontSize: '15px',
            color: '#cbd5e1',
            marginBottom: '32px',
            margin: '12px 0 32px 0',
          }}>No encontramos canciones con esos filtros. Intenta ajustar tu búsqueda.</p>
          <button
            onClick={() => setFilters({})}
            style={{
              padding: '12px 28px',
              background: colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              boxShadow: `0 4px 12px ${colors.primary}20`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${colors.primary}20`;
            }}
          >
            Ver todas las canciones
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            animation: 'fadeIn 0.4s ease-in',
          }}
        >
          {songs.map((song, index) => (
            <div
              key={song.id}
              style={{
                animation: `slideUp 0.4s ease-out ${index * 0.05}s both`,
              }}
            >
              <SongCard song={song} />
            </div>
          ))}
        </div>
      )}
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
