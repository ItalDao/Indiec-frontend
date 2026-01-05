import { useState } from 'react';
import { Input, Button } from '../../../../../shared/ui';
import { colors } from '../../../../../shared/theme/colors';
import type { SongFilters } from '../../domain/models/Song';

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
        background: colors.backgroundCard,
        padding: '1.5rem',
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        marginBottom: '2rem',
      }}
    >
      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
         Filtros
      </h3>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <Input
          placeholder="Buscar por título, artista..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: colors.text,
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Ordenar por
          </label>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as SongFilters['orderBy'])}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              background: colors.backgroundLight,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.text,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="recientes">Más recientes</option>
            <option value="populares">Más populares</option>
            <option value="alfabetico">Alfabético</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button variant="primary" onClick={handleApply}>
          Aplicar Filtros
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          Limpiar
        </Button>
      </div>
    </div>
  );
};
