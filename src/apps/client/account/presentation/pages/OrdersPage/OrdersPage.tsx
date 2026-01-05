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
              Mis Pedidos
            </h1>
          </div>
        </div>

        {/* Orders List */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={e => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={e => {
                const target = e.currentTarget;
                target.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                target.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)';
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#E5E7EB', fontSize: '1.1rem', fontWeight: 700 }}>
                  Orden #{order.id}
                </h3>
                <p style={{ margin: '0.25rem 0', color: '#A78BFA', fontSize: '0.9rem' }}>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>Estado:</span>
                  <span style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '6px',
                    background: order.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                    color: order.status === 'completed' ? '#86efac' : '#A78BFA',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: order.status === 'completed' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(139, 92, 246, 0.3)',
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: '#CBD5E1', fontSize: '0.9rem' }}>Total</p>
                  <h3 style={{
                    margin: '0.25rem 0 0 0',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    ${order.total.toFixed(2)}
                  </h3>
                </div>
                <button
                  onClick={() => navigate(`/client/orders/${order.id}`)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
                    color: '#A78BFA',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  onMouseEnter={e => {
                    const target = e.currentTarget;
                    target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)';
                    target.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const target = e.currentTarget;
                    target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)';
                    target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                    target.style.transform = 'translateY(0)';
                  }}
                >
                  Ver detalle →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
