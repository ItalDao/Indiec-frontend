// src/apps/shell/layout/ClientLayout.tsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { colors } from '../../../shared/theme/colors';
import GlobalSearchBar from '../../client/home/presentation/components/GlobalSearchBar';
import { HomeMockRepository } from "../../client/home/mocks/HomeMockRepository";



const repo = new HomeMockRepository();

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
    gap: '2rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <header style={headerStyles}>
        <div style={containerStyles}>
          {/* LOGO */}
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

          {/* 🔍 BUSCADOR GLOBAL */}
          <div style={{ flex: 1, maxWidth: '520px' }}>
            <GlobalSearchBar repository={repo} />
          </div>

          {/* NAV */}
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
            
            {/* Botón de FAQ */}
            <Link to="/client/faq" title="Preguntas Frecuentes">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: colors.backgroundCard,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.backgroundCard;
              }}
              >
                ?
              </div>
            </Link>

            {/* Botón de Configuración */}
            <Link to="/client/settings" title="Configuración">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: colors.backgroundCard,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.backgroundCard;
              }}
              >
                ⚙️
              </div>
            </Link>

            {/* Avatar de Usuario */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}>
              U
            </div>
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

      <footer style={{
        marginTop: '4rem',
        padding: '3rem 2rem',
        background: colors.backgroundLight,
        borderTop: `1px solid ${colors.border}`,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : '1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Columna 1: Sobre INDIEC */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: colors.text, fontWeight: '600' }}>
                INDIEC
              </h4>
              <p style={{ fontSize: '0.875rem', color: colors.textMuted, lineHeight: '1.6' }}>
                Plataforma de música independiente que conecta artistas con su público.
              </p>
            </div>
            
            {/* Columna 2: Enlaces Rápidos */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: colors.text, fontWeight: '600' }}>
                Enlaces
              </h4>
              <Link 
                to="/client/about" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: colors.textSecondary, 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                Sobre INDIEC
              </Link>
              <Link 
                to="/client/faq" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: colors.textSecondary, 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                Preguntas Frecuentes
              </Link>
              <Link 
                to="/client/contact" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  color: colors.textSecondary, 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                Contacto
              </Link>
            </div>
            
            {/* Columna 3: Legal */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: colors.text, fontWeight: '600' }}>
                Legal
              </h4>
              <Link 
                to="/client/terms" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: colors.textSecondary, 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                Términos y Condiciones
              </Link>
              <Link 
                to="/client/privacy" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  color: colors.textSecondary, 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                Política de Privacidad
              </Link>
            </div>

            {/* Columna 4: Cuenta */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: colors.text, fontWeight: '600' }}>
                Cuenta
              </h4>
              <Link 
                to="/client/settings" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: colors.textSecondary, 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                Configuración
              </Link>
              <span 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  color: colors.textMuted,
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
            borderTop: `1px solid ${colors.border}`,
            textAlign: 'center' 
          }}>
            <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
              © 2024 INDIEC. Todos los derechos reservados.
            </p>
            <p style={{ color: colors.textMuted, fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Hecho con 💜 para la comunidad indie
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
