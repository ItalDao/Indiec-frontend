import { useState } from 'react';
import { Input } from '../../../../../shared/ui';
import { colors } from '../../../../../shared/theme/colors';
import type { SongFilters } from '../../domain/models/Song';
import { Icons } from './Icons';

interface SongFiltersProps {
  onFilter: (filters: SongFilters) => void;
  onReset: () => void;
}

export const SongFiltersComponent = ({ onFilter, onReset }: SongFiltersProps) => {
  const [busqueda, setBusqueda] = useState('');
  const [orderBy, setOrderBy] = useState<SongFilters['orderBy']>('recientes');

  const handleApply = () => {
    onFilter({
      busqueda: busqueda || undefined,
      orderBy,
    });
  };

  const handleReset = () => {
    setBusqueda('');
    setOrderBy('recientes');
    onReset();
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6), rgba(45, 27, 105, 0.4))',
        backdropFilter: 'blur(12px)',
        padding: '32px',
        borderRadius: '16px',
        border: `1px solid rgba(139, 92, 246, 0.3)`,
        marginBottom: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Search section */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#cbd5e1',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icons.Search />
          </div>
          <Input
            placeholder="Busca canciones, artistas o álbumes..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            style={{
              fontSize: '15px',
              padding: '14px 16px 14px 50px',
              background: 'rgba(15, 23, 42, 0.4)',
              border: `1.5px solid rgba(139, 92, 246, 0.3)`,
              borderRadius: '10px',
              transition: 'all 0.2s ease',
              outline: 'none',
              color: '#fff',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary;
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
              e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#cbd5e1',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <Icons.X />
            </button>
          )}
        </div>
      </div>

      {/* Sort section */}
      <div style={{ marginBottom: '28px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '12px',
            color: '#e2e8f0',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            opacity: 0.9,
          }}
        >
          Ordenar por
        </label>
        <div style={{ position: 'relative' }}>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as SongFilters['orderBy'])}
            style={{
              width: '100%',
              padding: '14px 16px 14px 16px',
              fontSize: '14px',
              background: 'rgba(15, 23, 42, 0.4)',
              border: `1.5px solid rgba(139, 92, 246, 0.3)`,
              borderRadius: '10px',
              color: '#fff',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              appearance: 'none',
              paddingRight: '40px',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary;
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
              e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <option value="recientes">Más recientes</option>
            <option value="populares">Más populares</option>
            <option value="alfabetico">Alfabético</option>
          </select>
          <div
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#cbd5e1',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icons.ChevronDown style={{ width: '18px', height: '18px' }} />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleApply}
          style={{
            flex: 1,
            fontSize: '14px',
            fontWeight: '700',
            padding: '14px 16px',
            background: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
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
          Buscar
        </button>
        <button
          onClick={handleReset}
          style={{
            flex: 1,
            fontSize: '14px',
            fontWeight: '700',
            padding: '14px 16px',
            background: 'transparent',
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.background = `${colors.primary}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};
