import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderApi } from '../../../infrastructure/api/orderApi';
import type { Order } from '../../../domain/models/Order';
import { Icons } from '../../../../songs/presentation/components/Icons';
import { QRCodeComponent } from '../../../../../../shared/ui';

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
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/client/orders')}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: '1.5px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(30, 27, 75, 0.4)',
            color: '#c084fc',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '40px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={e => {
            const target = e.currentTarget;
            target.style.background = 'rgba(139, 92, 246, 0.15)';
            target.style.borderColor = '#8b5cf6';
            target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            const target = e.currentTarget;
            target.style.background = 'rgba(30, 27, 75, 0.4)';
            target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            target.style.transform = 'translateY(0)';
          }}
        >
          ← Volver a mis pedidos
        </button>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 64px)',
            fontWeight: '900',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 16px 0',
            letterSpacing: '-2px',
          }}>
            Orden #{order.id}
          </h1>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Creado</span>
              <p style={{ margin: '8px 0 0 0', color: '#e2e8f0', fontWeight: '500', fontSize: '15px' }}>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</span>
              <p style={{
                margin: '8px 0 0 0',
                padding: '6px 12px',
                borderRadius: '8px',
                background: order.status === 'completed' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                color: order.status === 'completed' ? '#86efac' : '#c084fc',
                fontSize: '13px',
                fontWeight: '600',
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
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          <h3 style={{ color: '#e2e8f0', marginBottom: '16px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: '700' }}>
            <Icons.ShoppingCart />
            Productos
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {order.items.map((it, idx) => (
              <div key={idx} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '16px',
                paddingBottom: idx !== order.items.length - 1 ? '12px' : 0,
                borderBottom: idx !== order.items.length - 1 ? '1px solid rgba(139, 92, 246, 0.2)' : 'none',
              }}>
                <div>
                  <strong style={{ color: '#e2e8f0', fontSize: '15px' }}>{it.product.name}</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#c084fc', fontSize: '13px', fontWeight: '500' }}>
                    {it.size} • {it.color}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px' }}>
                    {it.quantity} × ${it.product.price.toFixed(2)}
                  </p>
                  <strong style={{ color: '#8b5cf6', fontSize: '15px' }}>
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
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <h3 style={{ color: '#e2e8f0', marginBottom: '16px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: '700' }}>
              <Icons.Truck />
              Envío
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <span style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Método</span>
                <p style={{ margin: '6px 0 0 0', color: '#e2e8f0', fontWeight: '500', fontSize: '15px' }}>{order.shippingMethod}</p>
              </div>
              <div>
                <span style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Costo</span>
                <p style={{ margin: '6px 0 0 0', color: '#e2e8f0', fontWeight: '500', fontSize: '15px' }}>${order.shippingCost?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* TOTAL */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>Total del Pedido</p>
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ${order.total.toFixed(2)}
          </h2>
        </div>

        {/* QR CODE */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
        }}>
          <h3 style={{ color: '#e2e8f0', marginTop: 0, marginBottom: '12px', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: '700' }}>
            Código QR de Confirmación
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '16px' }}>
            Muestra este código al recoger tu pedido o úsalo para rastrear tu orden
          </p>
          <QRCodeComponent
            value={`ORDER-${order.id}-${new Date(order.createdAt).getTime()}`}
            size={256}
            downloadFileName={`orden-${order.id}.png`}
          />
        </div>
      </div>
    </div>
  );
};
