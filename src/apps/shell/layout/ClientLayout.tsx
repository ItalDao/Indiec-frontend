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
    { path: '/client/home', label: 'Inicio', Icon: Icons.Home },
    { path: '/client/artists', label: 'Artistas', Icon: Icons.Mic2 },
    { path: '/client/songs', label: 'Canciones', Icon: Icons.Music2 },
    { path: '/client/events', label: 'Eventos', Icon: Icons.Calendar },
    { path: '/client/store', label: 'Tienda', Icon: Icons.ShoppingBag }
  ];

  const headerStyles: React.CSSProperties = {
    height: '80px',
    background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.85) 50%, rgba(26, 31, 58, 0.95) 100%)',
    backdropFilter: 'blur(30px)',
    borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
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
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: '900',
              margin: 0,
              background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 50%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-1px',
            }}>
              INDIEC
            </h1>
          </Link>

          {/* BUSCADOR */}
          <div style={{ flex: 1, maxWidth: '600px', minWidth: '300px' }}>
            <GlobalSearchBar repository={repo} />
          </div>

          {/* NAV */}
          <nav style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(139, 92, 246, 0.1)',
          }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: isActive ? '#8b5cf6' : '#cbd5e1',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '0.95rem',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%)'
                      : 'transparent',
                    border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#e2e8f0';
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#cbd5e1';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: 'inherit' }}>
                    <item.Icon />
                  </div>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}>
            {/* FAQ */}
            <Link
              to="/client/faq"
              title="Preguntas Frecuentes"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.12)',
                color: '#cbd5e1',
                fontWeight: '700',
                fontSize: '18px',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.color = '#8b5cf6';
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ?
            </Link>

            {/* CONFIG */}
            <Link
              to="/client/settings"
              title="Configuración"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.12)',
                color: '#cbd5e1',
                fontSize: '18px',
                border: '1px solid rgba(139, 92, 246, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.color = '#8b5cf6';
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <Icons.Settings />
            </Link>

            {/* AVATAR → PERFIL */}
            <Link
              to="/client/profile"
              title="Mi perfil"
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: '#fff',
                  cursor: 'pointer',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
                }}
              >
                U
              </div>
            </Link>
          </div>
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