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
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 25px 50px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}>
            <h2 style={{ color: '#e2e8f0', marginBottom: '32px', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '700', margin: 0 }}>Datos de envío</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nombre completo</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(139, 92, 246, 0.2)',
                    background: 'rgba(30, 27, 75, 0.5)',
                    color: '#e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxSizing: 'border-box' as const,
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
              </div>
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Dirección</label>
                <input
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(139, 92, 246, 0.2)',
                    background: 'rgba(30, 27, 75, 0.5)',
                    color: '#e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxSizing: 'border-box' as const,
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
              </div>
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ciudad</label>
                <input
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(139, 92, 246, 0.2)',
                    background: 'rgba(30, 27, 75, 0.5)',
                    color: '#e2e8f0',
                    fontSize: '15px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxSizing: 'border-box' as const,
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
              </div>
              <button
                onClick={() => setStep(1)}
                style={{
                  width: '100%',
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
                  marginTop: '24px',
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
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
            border: '1.5px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '20px',
            padding: '48px',
            boxSizing: 'border-box',
          }}>
            <h2 style={{ 
              color: '#e2e8f0',
              margin: 0,
              marginBottom: '24px',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 700,
            }}>Método de envío</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 18px',
                borderRadius: '12px',
                border: `1.5px solid ${shippingMethod === 'standard' ? 'rgba(139, 92, 246, 1)' : 'rgba(139, 92, 246, 0.2)'}`,
                background: shippingMethod === 'standard' ? 'rgba(30, 27, 75, 0.8)' : 'rgba(30, 27, 75, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <input
                  type="radio"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#8b5cf6' }}
                />
                <span style={{ color: '#e2e8f0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
                  <Icons.Truck />
                  Envío estándar - $5
                </span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 18px',
                borderRadius: '12px',
                border: `1.5px solid ${shippingMethod === 'express' ? 'rgba(139, 92, 246, 1)' : 'rgba(139, 92, 246, 0.2)'}`,
                background: shippingMethod === 'express' ? 'rgba(30, 27, 75, 0.8)' : 'rgba(30, 27, 75, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <input
                  type="radio"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#8b5cf6' }}
                />
                <span style={{ color: '#e2e8f0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
                  <Icons.Zap />
                  Envío express - $15
                </span>
              </label>

              <button
                onClick={() => setStep(2)}
                style={{
                  width: '100%',
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
                  marginTop: '24px',
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
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
            border: '1.5px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '20px',
            padding: '48px',
            boxSizing: 'border-box',
          }}>
            <h2 style={{ 
              color: '#e2e8f0',
              margin: 0,
              marginBottom: '24px',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 700,
            }}>Método de pago</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                      <label style={{ 
                        display: 'block',
                        color: '#cbd5e1',
                        fontSize: '13px',
                        marginBottom: '8px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>Número de tarjeta</label>
                      <input
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                        style={{
                          width: '100%',
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
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block',
                        color: '#cbd5e1',
                        fontSize: '13px',
                        marginBottom: '8px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>Nombre en la tarjeta</label>
                      <input
                        value={form.cardName}
                        onChange={e => setForm({ ...form, cardName: e.target.value })}
                        style={{
                          width: '100%',
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
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      <div>
                        <label style={{ 
                          display: 'block',
                          color: '#cbd5e1',
                          fontSize: '13px',
                          marginBottom: '8px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>Expiración</label>
                        <input
                          placeholder="MM/AA"
                          value={form.expiry}
                          onChange={e => setForm({ ...form, expiry: e.target.value })}
                          style={{
                            width: '100%',
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
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block',
                          color: '#cbd5e1',
                          fontSize: '13px',
                          marginBottom: '8px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>CVV</label>
                        <input
                          placeholder="123"
                          value={form.cvv}
                          onChange={e => setForm({ ...form, cvv: e.target.value })}
                          style={{
                            width: '100%',
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
                  width: '100%',
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
                  marginTop: '24px',
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
