import { useState, useCallback } from 'react';

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
    <div
      style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
    >
      <h3 style={{ marginBottom: '1.25rem', color: '#E5E7EB', fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: 600 }}>🔍 Filtrar productos</h3>

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
            onFocus={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
              target.style.background = 'rgba(15, 23, 42, 0.9)';
              target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }}
            onBlur={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              target.style.background = 'rgba(15, 23, 42, 0.7)';
              target.style.boxShadow = 'none';
            }}
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
            onFocus={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
              target.style.background = 'rgba(15, 23, 42, 0.9)';
              target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }}
            onBlur={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              target.style.background = 'rgba(15, 23, 42, 0.7)';
              target.style.boxShadow = 'none';
            }}
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
            onFocus={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
              target.style.background = 'rgba(15, 23, 42, 0.9)';
              target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }}
            onBlur={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              target.style.background = 'rgba(15, 23, 42, 0.7)';
              target.style.boxShadow = 'none';
            }}
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
            onFocus={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
              target.style.background = 'rgba(15, 23, 42, 0.9)';
              target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }}
            onBlur={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              target.style.background = 'rgba(15, 23, 42, 0.7)';
              target.style.boxShadow = 'none';
            }}
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
            onFocus={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
              target.style.background = 'rgba(15, 23, 42, 0.9)';
              target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }}
            onBlur={e => {
              const target = e.currentTarget;
              target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              target.style.background = 'rgba(15, 23, 42, 0.7)';
              target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Botón */}
        <div>
          <button
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
              color: '#A78BFA',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => {
              const target = e.currentTarget;
              target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)';
              target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.25)';
              target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const target = e.currentTarget;
              target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)';
              target.style.boxShadow = 'none';
              target.style.transform = 'translateY(0)';
            }}
            onClick={handleClear}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
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
  color: '#A78BFA',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '38px',
  padding: '0.45rem 0.6rem',
  borderRadius: '8px',
  border: '1px solid rgba(139, 92, 246, 0.3)',
  background: 'rgba(15, 23, 42, 0.7)',
  color: '#E5E7EB',
  fontSize: '0.9rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(10px)',
};
