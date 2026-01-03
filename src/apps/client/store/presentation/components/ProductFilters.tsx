import { useState, useCallback } from 'react';
import { Card, Button } from '../../../../../shared/ui';

export interface ProductFiltersValue {
  category?: string;
  size?: string;
  artist?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface Props {
  onChange: (filters: ProductFiltersValue) => void;
}

export const ProductFilters = ({ onChange }: Props) => {
  const [filters, setFilters] = useState<ProductFiltersValue>({
    category: '',
    size: '',
    artist: '',
    minPrice: undefined,
    maxPrice: undefined,
  });

  const updateFilters = useCallback(
    (newValues: Partial<ProductFiltersValue>) => {
      const updated = { ...filters, ...newValues };

      if (updated.minPrice === undefined || isNaN(updated.minPrice)) {
        delete updated.minPrice;
      }
      if (updated.maxPrice === undefined || isNaN(updated.maxPrice)) {
        delete updated.maxPrice;
      }

      setFilters(updated);
      onChange(updated);
    },
    [filters, onChange]
  );

  const handleClear = () => {
    setFilters({
      category: '',
      size: '',
      artist: '',
      minPrice: undefined,
      maxPrice: undefined,
    });
    onChange({});
  };

  return (
    <Card
      style={{
        marginBottom: '2rem',
        padding: '1.5rem',
      }}
    >
      <h3 style={{ marginBottom: '1.25rem' }}>🔍 Filtrar productos</h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1.25rem',
          alignItems: 'end',
        }}
      >
        {/* Categoría */}
        <div>
          <label style={labelStyle}>Categoría</label>
          <select
            style={inputStyle}
            value={filters.category}
            onChange={e =>
              updateFilters({ category: e.target.value || undefined })
            }
          >
            <option value="">Todas</option>
            <option value="camiseta">Camiseta</option>
            <option value="hoodie">Hoodie</option>
            <option value="gorra">Gorra</option>
          </select>
        </div>

        {/* Talla */}
        <div>
          <label style={labelStyle}>Talla</label>
          <select
            style={inputStyle}
            value={filters.size}
            onChange={e =>
              updateFilters({ size: e.target.value || undefined })
            }
          >
            <option value="">Todas</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        {/* Artista */}
        <div>
          <label style={labelStyle}>Artista</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Ej: Indie Band"
            value={filters.artist}
            onChange={e =>
              updateFilters({ artist: e.target.value || undefined })
            }
          />
        </div>

        {/* Precio mínimo */}
        <div>
          <label style={labelStyle}>Precio mín.</label>
          <input
            style={inputStyle}
            type="number"
            min={0}
            placeholder="$0"
            value={filters.minPrice ?? ''}
            onChange={e =>
              updateFilters({
                minPrice: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
          />
        </div>

        {/* Precio máximo */}
        <div>
          <label style={labelStyle}>Precio máx.</label>
          <input
            style={inputStyle}
            type="number"
            min={0}
            placeholder="$100"
            value={filters.maxPrice ?? ''}
            onChange={e =>
              updateFilters({
                maxPrice: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
          />
        </div>

        {/* Botón */}
        <div>
          <Button
            variant="secondary"
            size="sm"
            style={{ width: '100%' }}
            onClick={handleClear}
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </Card>
  );
};

/* =======================
   ESTILOS REUTILIZABLES
======================= */

const labelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 500,
  marginBottom: '0.35rem',
  display: 'block',
  color: '#CBD5E1',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '38px',
  padding: '0.45rem 0.6rem',
  borderRadius: '8px',
  border: '1px solid #334155',
  background: '#020617',
  color: '#E5E7EB',
};
