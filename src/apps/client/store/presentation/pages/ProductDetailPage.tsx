import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProductDetail } from '../hooks/useProductDetail';
import { cartApi } from '../../../account/infrastructure/api/cartApi';
import { addToCart } from '../../../account/application/usecases/addToCart';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading } = useProductDetail(Number(id));

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (loading || !product) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <p style={{ color: '#A78BFA', fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>Cargando producto...</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    const execute = addToCart(cartApi);
    await execute({ product, quantity, size, color });
    navigate('/client/cart');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      padding: '3rem 1rem',
    }}>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {/* Imagen */}
        <div
          style={{
            flex: '1 1 400px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.4)',
            padding: '1rem',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '12px',
            }}
          />
        </div>

        {/* Detalles */}
        <div
          style={{
            flex: '1 1 500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.4)',
          }}
        >
          <h1 style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #A78BFA 0%, #C084FC 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
          }}>
            {product.name}
          </h1>
          <p style={{
            color: '#CBD5E1',
            lineHeight: 1.7,
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
          }}>
            {product.description}
          </p>

          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2) 0%, transparent 100%)',
            margin: '1rem 0',
          }} />

          <h2 style={{
            fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ${product.price.toFixed(2)}
          </h2>

          {/* Talla */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontWeight: 600,
              color: '#A78BFA',
              fontSize: '0.85rem',
            }}>Talla</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                background: 'rgba(15, 23, 42, 0.7)',
                color: '#E5E7EB',
                cursor: 'pointer',
                fontSize: '0.9rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
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
              <option value="">Seleccione</option>
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontWeight: 600,
              color: '#A78BFA',
              fontSize: '0.85rem',
            }}>Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                background: 'rgba(15, 23, 42, 0.7)',
                color: '#E5E7EB',
                cursor: 'pointer',
                fontSize: '0.9rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
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
              <option value="">Seleccione</option>
              {product.colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Cantidad */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontWeight: 600,
              color: '#A78BFA',
              fontSize: '0.85rem',
            }}>Cantidad</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                background: 'rgba(15, 23, 42, 0.7)',
                color: '#E5E7EB',
                fontSize: '0.9rem',
                width: '100px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
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

          <button
            onClick={handleAddToCart}
            style={{
              marginTop: '1rem',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#fff',
              fontSize: 'clamp(0.9rem, 3vw, 1rem)',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={e => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={e => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
