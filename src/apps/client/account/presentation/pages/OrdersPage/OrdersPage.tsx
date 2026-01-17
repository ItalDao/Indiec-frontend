import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../../../infrastructure/api/orderApi';
import type { Order } from '../../../domain/models/Order';
import { Icons } from '../../../../songs/presentation/components/Icons';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderApi.getMyOrders();
        setOrders(data || []);
      } catch (error) {
        console.error('Error cargando pedidos', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: '#A78BFA', fontSize: '1.1rem' }}>Cargando pedidos...</p>
      </div>
    );
  }

  if (orders.length === 0) {
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
        <h2 style={{ color: '#E5E7EB', fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>Mis pedidos</h2>
        <p style={{ color: '#CBD5E1', textAlign: 'center', maxWidth: '400px' }}>Aún no has realizado ningún pedido.</p>
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
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 64px)',
            fontWeight: '900',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-2px',
          }}>
            Mis Pedidos
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#cbd5e1',
            fontWeight: '400',
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Visualiza, edita y gestiona todos tus pedidos
          </p>
        </div>

        {/* Orders List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '24px',
                alignItems: 'flex-start',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={e => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                target.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.15)';
              }}
              onMouseLeave={e => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                target.style.boxShadow = 'none';
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: '#e2e8f0', fontSize: '16px', fontWeight: '700' }}>
                  Orden #{order.id}
                </h3>
                <p style={{ margin: '0.25rem 0', color: '#cbd5e1', fontSize: '14px' }}>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '13px' }}>Estado:</span>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: order.status === 'completed' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                    color: order.status === 'completed' ? '#86efac' : '#c084fc',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: order.status === 'completed' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(139, 92, 246, 0.3)',
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px' }}>Total</p>
                  <h3 style={{
                    margin: '4px 0 0 0',
                    fontSize: '20px',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    ${order.total.toFixed(2)}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                  <button
                    onClick={() => navigate(`/client/orders/${order.id}`)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1.5px solid rgba(139, 92, 246, 0.3)',
                      background: 'transparent',
                      color: '#a78bfa',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.color = '#c4b5fd';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.color = '#a78bfa';
                      e.currentTarget.style.background = 'transparent';
                    }}
                    title="Ver detalles"
                  >
                    <Icons.Music />
                  </button>
                  <button
                    onClick={() => navigate(`/client/orders/${order.id}`)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1.5px solid rgba(139, 92, 246, 0.3)',
                      background: 'transparent',
                      color: '#a78bfa',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.color = '#c4b5fd';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                      e.currentTarget.style.color = '#a78bfa';
                      e.currentTarget.style.background = 'transparent';
                    }}
                    title="Descargar factura"
                  >
                    <Icons.FileText />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
