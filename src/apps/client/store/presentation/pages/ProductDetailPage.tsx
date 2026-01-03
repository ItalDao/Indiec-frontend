import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProductDetail } from '../hooks/useProductDetail';
import { cartApi } from '../../../account/infrastructure/api/cartApi';
import { addToCart } from '../../../account/application/usecases/addToCart';
import { Button } from '../../../../../shared/ui';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading } = useProductDetail(Number(id));

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (loading || !product) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <p>Cargando producto...</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    const execute = addToCart(cartApi);
    await execute({ product, quantity, size, color });
    navigate('/client/cart');
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          maxWidth: '1000px',
          margin: '0 auto',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {/* Imagen */}
        <div
          style={{
            flex: '1 1 400px',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            background: 'var(--background-card)',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
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
            background: 'var(--background-card)',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text)' }}>
            {product.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {product.description}
          </p>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)' }}>
            ${product.price.toFixed(2)}
          </h2>

          {/* Talla */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500 }}>Talla</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid var(--border-light)`,
                background: 'var(--background)',
                color: 'var(--text)',
                cursor: 'pointer',
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
            <label style={{ fontWeight: 500 }}>Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid var(--border-light)`,
                background: 'var(--background)',
                color: 'var(--text)',
                cursor: 'pointer',
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
            <label style={{ fontWeight: 500 }}>Cantidad</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid var(--border-light)`,
                background: 'var(--background)',
                color: 'var(--text)',
                width: '100px',
              }}
            />
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleAddToCart}
            style={{ marginTop: '1rem', backgroundColor: 'var(--primary)' }}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};
