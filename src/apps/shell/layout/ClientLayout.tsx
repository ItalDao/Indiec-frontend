import { Outlet, Link, useLocation } from 'react-router-dom';
import { colors } from '../../../shared/theme/colors';

const ClientLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/client/home', label: 'Inicio' },
    { path: '/client/artists', label: 'Artistas' },
    { path: '/client/songs', label: 'Canciones' },
    { path: '/client/events', label: 'Eventos' },
    { path: '/client/store', label: 'Tienda' },
  ];

  const headerStyles: React.CSSProperties = {
    height: '80px',
    background: `${colors.backgroundLight}CC`,
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${colors.border}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 2rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <header style={headerStyles}>
        <div style={containerStyles}>
          <Link to="/client/home" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>
              <span
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                INDIEC
              </span>
            </h1>
          </Link>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    color: isActive ? colors.primary : colors.textSecondary,
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '0.95rem',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* PERFIL */}
            <Link to="/client/profile" style={{ textDecoration: 'none' }}>
              <div
                title="Mi perfil"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                SA
              </div>
            </Link>
          </nav>
        </div>
      </header>

      {/* ⬇️ AQUÍ ESTABA EL PROBLEMA */}
      <main
        style={{
          color: colors.textPrimary,
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Outlet />
      </main>

      <footer
        style={{
          marginTop: '4rem',
          padding: '3rem 2rem',
          background: colors.backgroundLight,
          borderTop: `1px solid ${colors.border}`,
          textAlign: 'center',
        }}
      >
        <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
          © 2024 INDIEC. Plataforma de música independiente.
        </p>
      </footer>
    </div>
  );
};

export default ClientLayout;
