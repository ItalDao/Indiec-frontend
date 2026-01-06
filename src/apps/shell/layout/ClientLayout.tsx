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
    { path: '/client/store', label: 'Tienda' },
  
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
          <Link to="/client/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
            <h1 style={{ fontSize: '1.7rem', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>
              <span
                style={{
                  background: `linear-gradient(135deg, #fff 0%, ${colors.primary} 50%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                INDIEC
              </span>
            </h1>
          </Link>

          {/* BUSCADOR GLOBAL */}
          <div style={{ flex: 1, maxWidth: '600px', minWidth: '300px' }}>
            <GlobalSearchBar repository={repo} />
          </div>

          {/* NAV */}
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: '0 0 auto' }}>
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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                    letterSpacing: '-0.3px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = colors.primary;
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#cbd5e1';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Botón de FAQ */}
            <Link to="/client/faq" title="Preguntas Frecuentes" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.12)',
                border: `1px solid rgba(139, 92, 246, 0.25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: '#cbd5e1',
                fontWeight: '700',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(139, 92, 246, 0.3)`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                ?
              </div>
            </Link>

            {/* Botón de Configuración */}
            <Link to="/client/settings" title="Configuración" style={{ textDecoration: 'none' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.12)',
                border: `1px solid rgba(139, 92, 246, 0.25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: '#cbd5e1',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(139, 92, 246, 0.3)`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <Icons.Settings />
              </div>
            </Link>

            {/* Avatar de Usuario */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              color: '#fff',
              boxShadow: `0 4px 16px rgba(139, 92, 246, 0.4)`,
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.12) translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(139, 92, 246, 0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 16px rgba(139, 92, 246, 0.4)`;
            }}
            >
              U
            </div>
          </nav>
        </div>
      </header>
      {/* Main content */}
      <main
        style={{
          color: colors.textPrimary,
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Outlet />
      </main>

      <footer style={{
        marginTop: '4rem',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : '1fr',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            {/* Columna 1: Sobre INDIEC */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#E5E7EB', fontWeight: '700', fontSize: '1rem' }}>
                INDIEC
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#A78BFA', lineHeight: '1.6' }}>
                Plataforma de música independiente que conecta artistas con su público.
              </p>
            </div>
            
            {/* Columna 2: Enlaces Rápidos */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#E5E7EB', fontWeight: '700', fontSize: '1rem' }}>
                Enlaces
              </h4>
              <Link 
                to="/client/about" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: '#CBD5E1', 
                  textDecoration: 'none',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#A78BFA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}
              >
                Sobre INDIEC
              </Link>
              <Link 
                to="/client/faq" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: '#CBD5E1', 
                  textDecoration: 'none',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#A78BFA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}
              >
                Preguntas Frecuentes
              </Link>
              <Link 
                to="/client/contact" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  color: '#CBD5E1', 
                  textDecoration: 'none',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#A78BFA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}
              >
                Contacto
              </Link>
            </div>
            
            {/* Columna 3: Legal */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#E5E7EB', fontWeight: '700', fontSize: '1rem' }}>
                Legal
              </h4>
              <Link 
                to="/client/terms" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: '#CBD5E1', 
                  textDecoration: 'none',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#A78BFA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}
              >
                Términos y Condiciones
              </Link>
              <Link 
                to="/client/privacy" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  color: '#CBD5E1', 
                  textDecoration: 'none',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#A78BFA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}
              >
                Política de Privacidad
              </Link>
            </div>

            {/* Columna 4: Cuenta */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#E5E7EB', fontWeight: '700', fontSize: '1rem' }}>
                Cuenta
              </h4>
              <Link 
                to="/client/settings" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: '#CBD5E1', 
                  textDecoration: 'none',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#A78BFA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}
              >
                Configuración
              </Link>
              <span 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  color: '#6B7280',
                  cursor: 'not-allowed'
                }}
              >
                Mi Perfil (Próximamente)
              </span>
            </div>
          </div>
          
          {/* Copyright */}
          <div style={{ 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(139, 92, 246, 0.2)',
            textAlign: 'center' 
          }}>
            <p style={{ color: '#CBD5E1', fontSize: '0.875rem', margin: 0 }}>
              © 2025 INDIEC. Todos los derechos reservados.
            </p>
            <p style={{ color: '#A78BFA', fontSize: '0.75rem', marginTop: '0.5rem', margin: '0.5rem 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Hecho con <span style={{ color: '#ec4899', fontSize: '1rem' }}><Icons.HeartFilled /></span> para la comunidad indie
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
