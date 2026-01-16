// src/apps/shell/layout/ClientLayout.tsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { colors } from '../../../shared/theme/colors';
import GlobalSearchBar from '../../client/home/presentation/components/GlobalSearchBar';
import { HomeMockRepository } from "../../client/home/mocks/HomeMockRepository";
import { Icons } from '../../client/songs/presentation/components/Icons';

const repo = new HomeMockRepository();

const ClientLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/client/home', label: 'Inicio' },
    { path: '/client/artists', label: 'Artistas' },
    { path: '/client/songs', label: 'Canciones' },
    { path: '/client/events', label: 'Eventos'},
    { path: '/client/store', label: 'Tienda' }
  ];

  const headerStyles: React.CSSProperties = {
    height: '80px',
    background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)',
    backdropFilter: 'blur(30px)',
    borderBottom: `1px solid rgba(139, 92, 246, 0.15)`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <header style={headerStyles}>
        <div style={containerStyles}>
          {/* LOGO */}
          <Link
            to="/client/home"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <h1 style={{ fontSize: '1.7rem', fontWeight: '900', margin: 0 }}>
              <span
                style={{
                  background: `linear-gradient(135deg, #fff 0%, ${colors.primary} 50%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                INDIEC
              </span>
            </h1>
          </Link>

          {/* BUSCADOR */}
          <div style={{ flex: 1, maxWidth: '600px', minWidth: '300px' }}>
            <GlobalSearchBar repository={repo} />
          </div>

          {/* NAV */}
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    color: isActive ? colors.primary : '#cbd5e1',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '0.95rem',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* FAQ */}
            <Link to="/client/faq" title="Preguntas Frecuentes">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                fontWeight: '700',
              }}>
                ?
              </div>
            </Link>

            {/* CONFIG */}
            <Link to="/client/settings" title="Configuración">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
              }}>
                <Icons.Settings />
              </div>
            </Link>

            {/* ✅ AVATAR → PERFIL */}
            <Link to="/client/profile" title="Mi perfil" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: `0 4px 16px rgba(139, 92, 246, 0.4)`,
                }}
              >
                U
              </div>
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <main
        style={{
          color: colors.textPrimary,
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;