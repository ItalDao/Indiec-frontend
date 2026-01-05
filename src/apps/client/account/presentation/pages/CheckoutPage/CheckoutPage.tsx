import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../../../application/usecases/checkout';
import { orderApi } from '../../../infrastructure/api/orderApi';
import { CheckoutSteps } from '../../components/Steps/CheckoutSteps';
import { useCart } from '../../hooks/useCart';
import { Icons } from '../../../../songs/presentation/components/Icons';

export const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { items, subtotal, discountAmount, total: cartTotal } = useCart();

  const [shippingMethod, setShippingMethod] =
    useState<'standard' | 'express'>('standard');

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    payment: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleConfirm = async () => {
    const execute = checkout(orderApi);
    const shippingCost = shippingMethod === 'express' ? 15 : 5;
    const totalWithShipping = cartTotal + shippingCost;

    const orderResult = await execute({
      ...form,
      shippingMethod,
      shippingCost,
      total: totalWithShipping,
    });

    navigate(`/client/orders/${orderResult.id}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      padding: '3rem 1rem',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <CheckoutSteps step={step} />

        {/* PASO 1 - DATOS */}
        {step === 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
          }}>
            <h2 style={{ color: '#E5E7EB', marginBottom: '1.5rem', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>Datos de envío</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', color: '#A78BFA', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>Nombre completo</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
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
              </div>
              <div>
                <label style={{ display: 'block', color: '#A78BFA', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>Dirección</label>
                <input
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  style={{
                    width: '100%',
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
              </div>
              <div>
                <label style={{ display: 'block', color: '#A78BFA', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>Ciudad</label>
                <input
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  style={{
                    width: '100%',
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
              </div>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '0.85rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: '0.5rem',
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
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 2 - ENVÍO */}
        {step === 1 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
          }}>
            <h2 style={{ color: '#E5E7EB', marginBottom: '1.5rem', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>Método de envío</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '8px',
                border: `2px solid ${shippingMethod === 'standard' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.2)'}`,
                background: shippingMethod === 'standard' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <input
                  type="radio"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#8b5cf6' }}
                />
                <span style={{ color: '#E5E7EB', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icons.Truck />
                  Envío estándar - $5
                </span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '8px',
                border: `2px solid ${shippingMethod === 'express' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.2)'}`,
                background: shippingMethod === 'express' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <input
                  type="radio"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#8b5cf6' }}
                />
                <span style={{ color: '#E5E7EB', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icons.Zap />
                  Envío express - $15
                </span>
              </label>

              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '0.85rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: '1rem',
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
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 - PAGO */}
        {step === 2 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
          }}>
            <h2 style={{ color: '#E5E7EB', marginBottom: '1.5rem', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>Método de pago</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* TARJETA */}
              <label
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `2px solid ${form.payment === 'card' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.2)'}`,
                  background: form.payment === 'card' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: form.payment === 'card' ? '1rem' : 0 }}>
                  <input
                    type="radio"
                    checked={form.payment === 'card'}
                    onChange={() => setForm({ ...form, payment: 'card' })}
                    style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#8b5cf6' }}
                  />
                  <span style={{ color: '#E5E7EB', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icons.CreditCard />
                    Tarjeta de crédito / débito
                  </span>
                </div>

                {form.payment === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: '#A78BFA', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>Número de tarjeta</label>
                      <input
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                        style={{
                          width: '100%',
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
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#A78BFA', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>Nombre en la tarjeta</label>
                      <input
                        value={form.cardName}
                        onChange={e => setForm({ ...form, cardName: e.target.value })}
                        style={{
                          width: '100%',
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
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', color: '#A78BFA', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>Expiración</label>
                        <input
                          placeholder="MM/AA"
                          value={form.expiry}
                          onChange={e => setForm({ ...form, expiry: e.target.value })}
                          style={{
                            width: '100%',
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
                      </div>
                      <div>
                        <label style={{ display: 'block', color: '#A78BFA', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>CVV</label>
                        <input
                          placeholder="123"
                          value={form.cvv}
                          onChange={e => setForm({ ...form, cvv: e.target.value })}
                          style={{
                            width: '100%',
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
                      </div>
                    </div>
                  </div>
                )}
              </label>

              {/* PAYPAL */}
              <label
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `2px solid ${form.payment === 'paypal' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.2)'}`,
                  background: form.payment === 'paypal' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="radio"
                    checked={form.payment === 'paypal'}
                    onChange={() => setForm({ ...form, payment: 'paypal' })}
                    style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#8b5cf6' }}
                  />
                  <span style={{ color: '#E5E7EB', fontWeight: 600 }}>PayPal</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#A78BFA', margin: '0.5rem 0 0 2rem' }}>
                  Serás redirigido a PayPal para completar el pago
                </p>
              </label>

              {/* CONTRA ENTREGA */}
              <label
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `2px solid ${form.payment === 'cash' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.2)'}`,
                  background: form.payment === 'cash' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="radio"
                    checked={form.payment === 'cash'}
                    onChange={() => setForm({ ...form, payment: 'cash' })}
                    style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#8b5cf6' }}
                  />
                  <span style={{ color: '#E5E7EB', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icons.DollarSign />
                    Pago contra entrega
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#A78BFA', margin: '0.5rem 0 0 2rem' }}>
                  Paga al recibir tu pedido
                </p>
              </label>

              <button
                onClick={() => setStep(3)}
                style={{
                  padding: '0.85rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: '1rem',
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
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 4 - RESUMEN */}
        {step === 3 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
          }}>
            <h2 style={{ color: '#E5E7EB', marginBottom: '1.5rem', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>Resumen del pedido</h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              {items.map((it, idx) => (
                <li key={idx} style={{ color: '#CBD5E1', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{it.product.name} × {it.quantity}</span>
                  <span style={{ color: '#A78BFA', fontWeight: 600 }}>${(it.product.price * it.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1', fontSize: '0.9rem' }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1', fontSize: '0.9rem' }}>
                <span>Descuento:</span>
                <span>${discountAmount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1', fontSize: '0.9rem' }}>
                <span>Envío:</span>
                <span>${shippingMethod === 'express' ? 15 : 5}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}>
              <span style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', fontWeight: 700, color: '#E5E7EB' }}>Total:</span>
              <span style={{
                fontSize: 'clamp(1.5rem, 6vw, 2rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                ${(cartTotal + (shippingMethod === 'express' ? 15 : 5)).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleConfirm}
              style={{
                width: '100%',
                padding: '0.85rem 1.5rem',
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
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
