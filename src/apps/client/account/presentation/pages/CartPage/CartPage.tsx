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
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 64px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            Carrito de Compras
          </h1>
        </div>

        {/* Items */}
        <div style={{
          display: 'grid',
          gap: '24px',
          marginBottom: '48px',
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
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
          border: '1.5px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '48px',
          boxSizing: 'border-box',
        }}>
          <h3 style={{ 
            color: '#e2e8f0',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: 0,
            marginBottom: '24px',
            fontSize: '18px',
            fontWeight: 700,
          }}>
            <span style={{ fontSize: '20px' }}>🎟️</span>
            Cupón de descuento
          </h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input
              placeholder="Ej: INDIE10"
              value={couponInput}
              onChange={e => setCouponInput(e.target.value)}
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                background: 'rgba(30, 27, 75, 0.5)',
                color: '#e2e8f0',
                fontSize: '15px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxSizing: 'border-box',
              }}
              onFocus={e => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(139, 92, 246, 1)';
                target.style.background = 'rgba(30, 27, 75, 0.8)';
                target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={e => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                target.style.background = 'rgba(30, 27, 75, 0.5)';
                target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={() => {
                pricing.applyCoupon(couponInput);
                setCouponInput('');
              }}
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
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
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
          border: '1.5px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '48px',
          boxSizing: 'border-box',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#cbd5e1', fontSize: '15px' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {pricing.discountPercent > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#22c55e', fontSize: '15px' }}>
              <span>Descuento:</span>
              <span>-${pricing.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2) 0%, transparent 100%)', margin: '24px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 700, color: '#e2e8f0' }}>Total:</span>
            <span style={{
              fontSize: 'clamp(24px, 6vw, 32px)',
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
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/client/store')}
            style={{
              flex: '1 1 150px',
              padding: '14px 28px',
              borderRadius: '12px',
              border: '1.5px solid rgba(139, 92, 246, 0.4)',
              background: 'transparent',
              color: '#cbd5e1',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => {
              const target = e.currentTarget;
              target.style.background = 'rgba(139, 92, 246, 0.1)';
              target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
              target.style.color = '#e2e8f0';
            }}
            onMouseLeave={e => {
              const target = e.currentTarget;
              target.style.background = 'transparent';
              target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              target.style.color = '#cbd5e1';
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
              padding: '14px 28px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#fff',
              fontSize: '15px',
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
