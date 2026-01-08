import { useNavigate } from 'react-router-dom';
import { getDashboardReport } from '../../application/usecases/dashboard/getDashboardReport';
import type {
  DashboardEvento,
  DashboardUsuario,
} from '../../domain/models/DashboardReport';

export default function DashboardPage() {
  const navigate = useNavigate();
  const report = getDashboardReport();

  const {
    eventosRecientes,
    usuariosRecientes,
    artistas,
    canciones,
    eventos,
    productos,
  } = report;

  const bgCard =
    'linear-gradient(135deg, rgba(30, 27, 75, 0.85), rgba(45, 27, 105, 0.6))';

  const cardStyle = {
    background: bgCard,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s ease',
  };

  const hoverUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-6px)';
    e.currentTarget.style.boxShadow =
      '0 14px 30px rgba(139, 92, 246, 0.25)';
    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
  };

  const hoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e1b4b 15%, #2d1b69 30%, #1a1f3a 45%, #0f172a 65%, #1a0033 80%, #0f172a 100%)',
        backgroundAttachment: 'fixed',
        paddingBottom: '60px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '60px' }}>
          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 56px)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #fff, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}
          >
            Dashboard
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '600px', fontSize: '18px' }}>
            Vista general del estado de la plataforma
          </p>
        </div>

        {/* MÉTRICAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '60px',
          }}
        >
          {[
            {
              icon: '👥',
              label: 'Artistas',
              value: artistas.activos + artistas.inactivos,
              detail: `${artistas.activos} activos • ${artistas.inactivos} inactivos`,
            },
            {
              icon: '🎵',
              label: 'Canciones',
              value: canciones.total,
              detail: `+${canciones.nuevasPeriodo} este mes`,
            },
            {
              icon: '📅',
              label: 'Eventos',
              value:
                eventos.proximos +
                eventos.enCurso +
                eventos.finalizados,
              detail: `${eventos.proximos} próximos`,
            },
            {
              icon: '📦',
              label: 'Productos',
              value: productos.activos,
              detail: `${productos.stockBajo} con stock bajo`,
            },
          ].map((m) => (
            <div
              key={m.label}
              style={cardStyle}
              onMouseEnter={hoverUp}
              onMouseLeave={hoverOut}
            >
              <div style={{ fontSize: '28px' }}>{m.icon}</div>
              <p style={{ color: '#cbd5e1', fontSize: '14px' }}>{m.label}</p>
              <p
                style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  color: '#fff',
                  margin: '6px 0',
                }}
              >
                {m.value}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        {/* ACCIONES RÁPIDAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '60px',
          }}
        >
          {[
            { label: 'Crear Artista', path: '/admin/artists' },
            { label: 'Crear Canción', path: '/admin/songs' },
            { label: 'Crear Evento', path: '/admin/events' },
            { label: 'Crear Producto', path: '/admin/store' },
          ].map((b) => (
            <button
              key={b.label}
              onClick={() => navigate(b.path)}
              style={{
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background:
                  'linear-gradient(135deg, #8b5cf6, #6366f1)',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 16px rgba(139, 92, 246, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              + {b.label}
            </button>
          ))}
        </div>

        {/* LISTAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '32px',
          }}
        >
          {/* EVENTOS */}
          <div style={cardStyle}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>
              ⏰ Eventos Recientes
            </h3>
            {eventosRecientes.map((e: DashboardEvento) => (
              <div
                key={e.id}
                style={{
                  padding: '14px',
                  borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                }}
              >
                <strong style={{ color: '#e2e8f0' }}>{e.nombre}</strong>
                <p style={{ color: '#cbd5e1', fontSize: '14px' }}>
                  🎤 {e.artista} • 📅 {e.fecha}
                </p>
              </div>
            ))}
          </div>

          {/* USUARIOS */}
          <div style={cardStyle}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>
              🆕 Usuarios Recientes
            </h3>
            {usuariosRecientes.map((u: DashboardUsuario) => (
              <div
                key={u.id}
                style={{
                  padding: '14px',
                  borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                }}
              >
                <strong style={{ color: '#e2e8f0' }}>{u.nombre}</strong>
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                  {u.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
