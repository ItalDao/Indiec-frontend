import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { usePricing } from '../../hooks/usePricing';
import { CartItemCard } from '../../components/Card/CartItemCard';
import { Icons } from '../../../../songs/presentation/components/Icons';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, loading, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const pricing = usePricing(subtotal);
  const [couponInput, setCouponInput] = useState('');

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ color: '#A78BFA', fontSize: '1.1rem' }}>Cargando carrito...</p>
    </div>
  );

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '2rem',
      }}>
        <div style={{ color: '#A78BFA', fontSize: '3rem' }}>
          <Icons.ShoppingCart />
        </div>
        <h2 style={{ color: '#E5E7EB', fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>Tu carrito está vacío</h2>
        <button
          onClick={() => navigate('/client/store')}
          style={{
            padding: '0.85rem 2rem',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      padding: '3rem 1rem',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ color: '#A78BFA', fontSize: '2rem' }}>
              <Icons.ShoppingCart />
            </div>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #A78BFA 0%, #C084FC 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>
              Carrito de Compras
            </h1>
          </div>
        </div>

        {/* Items */}
        <div style={{
          display: 'grid',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {items.map(item => (
            <CartItemCard
              key={`${item.product.id}-${item.size}-${item.color}`}
              item={item}
              onQuantityChange={q => updateQuantity(item, q)}
              onRemove={() => removeItem(item)}
            />
          ))}
        </div>

        {/* Cupón */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
        }}>
          <h3 style={{ color: '#E5E7EB', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#A78BFA', fontSize: '1.2rem' }}>🎟️</span>
            Cupón de descuento
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <input
              placeholder="Ej: INDIE10"
              value={couponInput}
              onChange={e => setCouponInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                background: 'rgba(15, 23, 42, 0.7)',
                color: '#E5E7EB',
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
            />
            <button
              onClick={() => {
                pricing.applyCoupon(couponInput);
                setCouponInput('');
              }}
              style={{
                padding: '0.75rem 1.5rem',
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
            >
              Aplicar
            </button>
          </div>

          {pricing.error && (
            <p style={{ color: '#ef4444', margin: 0, fontSize: '0.9rem' }}>{pricing.error}</p>
          )}

          {pricing.couponCode && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#86efac',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span>Cupón <b>{pricing.couponCode}</b> aplicado (-{pricing.discountPercent}%)</span>
              <button
                onClick={pricing.clearCoupon}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#86efac',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '0.25rem',
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#CBD5E1', fontSize: '0.95rem' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {pricing.discountPercent > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#22c55e', fontSize: '0.95rem' }}>
              <span>Descuento:</span>
              <span>-${pricing.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2) 0%, transparent 100%)', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', fontWeight: 700, color: '#E5E7EB' }}>Total:</span>
            <span style={{
              fontSize: 'clamp(1.5rem, 6vw, 2rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ${pricing.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/client/store')}
            style={{
              flex: '1 1 150px',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              background: 'transparent',
              color: '#A78BFA',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => {
              const target = e.currentTarget;
              target.style.background = 'rgba(139, 92, 246, 0.1)';
              target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
            }}
            onMouseLeave={e => {
              const target = e.currentTarget;
              target.style.background = 'transparent';
              target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            }}
          >
            Seguir comprando
          </button>

          <button
            onClick={() =>
              navigate('/client/checkout', {
                state: { total: pricing.total },
              })
            }
            style={{
              flex: '1 1 150px',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
            Continuar al Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
