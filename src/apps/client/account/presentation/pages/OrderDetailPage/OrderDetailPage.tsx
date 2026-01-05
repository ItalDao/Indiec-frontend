import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderApi } from '../../../infrastructure/api/orderApi';
import type { Order } from '../../../domain/models/Order';
import { Icons } from '../../../../songs/presentation/components/Icons';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await orderApi.getMyOrders();
        const found = data.find(o => String(o.id) === String(id)) ?? null;
        setOrder(found);
      } catch (err) {
        console.error('Error loading orders', err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: '#A78BFA', fontSize: '1.1rem' }}>Cargando orden...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: '#ef4444', fontSize: '1.1rem' }}>Orden no encontrada</p>
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
        <button
          onClick={() => navigate('/client/orders')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            background: 'transparent',
            color: '#A78BFA',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
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
          ← Volver a mis pedidos
        </button>

        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #A78BFA 0%, #C084FC 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 1rem 0',
          }}>
            Orden #{order.id}
          </h1>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>Creado</span>
              <p style={{ margin: '0.25rem 0 0 0', color: '#E5E7EB', fontWeight: 500 }}>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>Estado</span>
              <p style={{
                margin: '0.25rem 0 0 0',
                padding: '0.3rem 0.8rem',
                borderRadius: '6px',
                background: order.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                color: order.status === 'completed' ? '#86efac' : '#A78BFA',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: order.status === 'completed' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(139, 92, 246, 0.3)',
                display: 'inline-block',
              }}>
                {order.status}
              </p>
            </div>
          </div>
        </div>

        {/* ITEMS */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
        }}>
          <h3 style={{ color: '#E5E7EB', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'clamp(1.1rem, 4vw, 1.3rem)' }}>
            <Icons.ShoppingCart />
            Productos
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {order.items.map((it, idx) => (
              <div key={idx} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1rem',
                paddingBottom: idx !== order.items.length - 1 ? '1rem' : 0,
                borderBottom: idx !== order.items.length - 1 ? '1px solid rgba(139, 92, 246, 0.2)' : 'none',
              }}>
                <div>
                  <strong style={{ color: '#E5E7EB', fontSize: '1rem' }}>{it.product.name}</strong>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#A78BFA', fontSize: '0.85rem', fontWeight: 500 }}>
                    {it.size} • {it.color}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: '#CBD5E1', fontSize: '0.9rem' }}>
                    {it.quantity} × ${it.product.price.toFixed(2)}
                  </p>
                  <strong style={{ color: '#8b5cf6', fontSize: '1rem' }}>
                    ${(it.quantity * it.product.price).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ENVÍO */}
        {order.shippingMethod && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
          }}>
            <h3 style={{ color: '#E5E7EB', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'clamp(1.1rem, 4vw, 1.3rem)' }}>
              <Icons.Truck />
              Envío
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>Método</span>
                <p style={{ margin: '0.25rem 0 0 0', color: '#E5E7EB', fontWeight: 500 }}>{order.shippingMethod}</p>
              </div>
              <div>
                <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>Costo</span>
                <p style={{ margin: '0.25rem 0 0 0', color: '#E5E7EB', fontWeight: 500 }}>${order.shippingCost?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* TOTAL */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(45, 27, 105, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
        }}>
          <p style={{ margin: 0, color: '#CBD5E1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total del Pedido</p>
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ${order.total.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
};
