import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout = () => {
  const location = useLocation();
  const [showSettingsMenu, setShowSettingsMenu] = useState(true);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Panel', icon: '📊' },
    { path: '/admin/artists', label: 'Artistas', icon: '🎤' },
    { path: '/admin/songs', label: 'Canciones', icon: '🎵' },
    { path: '/admin/events', label: 'Eventos', icon: '🎪' },
    { path: '/admin/store', label: 'Tienda', icon: '🛍️' },
    { path: '/admin/catalogs', label: 'Catálogos', icon: '📚' },
    { path: '/admin/users', label: 'Usuarios', icon: '👥' },
  ];

  const settingsSubMenu = [
    { path: '/admin/settings/general', label: 'General', icon: '⚙️' },
    { path: '/admin/settings/static-pages', label: 'Páginas Estáticas', icon: '📄' },
    { path: '/admin/settings/users', label: 'Usuarios', icon: '👤' },
    { path: '/admin/settings/roles', label: 'Roles y Permisos', icon: '🔐' },
    { path: '/admin/settings/catalogs', label: 'Catálogos', icon: '📚' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSettingsActive = settingsSubMenu.some(item => isActive(item.path));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      <aside style={{
        width: '280px',
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '24px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '4px',
          }}>
            INDIEC
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>Panel de Administración</p>
        </div>

        <nav>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: active ? '#fff' : '#cbd5e1',
                  background: active ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  border: active ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  fontWeight: active ? '600' : '500',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div style={{ marginTop: '8px' }}>
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '8px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isSettingsActive ? '#fff' : '#cbd5e1',
                background: isSettingsActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                border: isSettingsActive ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                transition: 'all 0.3s ease',
                fontWeight: isSettingsActive ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>⚙️</span>
                <span>Configuración</span>
              </div>
              <span style={{ transition: 'transform 0.3s', transform: showSettingsMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▼
              </span>
            </button>

            {showSettingsMenu && (
              <div style={{ marginLeft: '12px', marginBottom: '8px' }}>
                {settingsSubMenu.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 16px',
                        marginBottom: '4px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: active ? '#8B5CF6' : '#94a3b8',
                        background: active ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                        transition: 'all 0.2s ease',
                        fontSize: '13px',
                        fontWeight: active ? '600' : '400',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#cbd5e1';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#94a3b8';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </aside>

      <div style={{ marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{
          height: '80px',
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#e2e8f0' }}>
            Administración
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/client/home"
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8B5CF6';
                e.currentTarget.style.borderColor = '#8B5CF6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              }}
            >
              🔗 Ver sitio
            </Link>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '18px',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}>
              A
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
    
  );
};

export default AdminLayout;