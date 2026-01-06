import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Icons } from '../../../apps/client/songs/presentation/components/Icons';

const AdminLayout = () => {
  const location = useLocation();
  const [showSettingsMenu, setShowSettingsMenu] = useState(true);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Panel', Icon: Icons.BarChart3 },
    { path: '/admin/artists', label: 'Artistas', Icon: Icons.Mic2 },
    { path: '/admin/songs', label: 'Canciones', Icon: Icons.Music2 },
    { path: '/admin/events', label: 'Eventos', Icon: Icons.Calendar },
    { path: '/admin/store', label: 'Tienda', Icon: Icons.ShoppingBag },
    { path: '/admin/catalogs', label: 'Catálogos', Icon: Icons.Layers },
    { path: '/admin/users', label: 'Usuarios', Icon: Icons.Users },
  ];

  const settingsSubMenu = [
    { path: '/admin/settings/general', label: 'General', Icon: Icons.Settings },
    { path: '/admin/settings/static-pages', label: 'Páginas Estáticas', Icon: Icons.FileText },
    { path: '/admin/settings/users', label: 'Usuarios', Icon: Icons.User },
    { path: '/admin/settings/roles', label: 'Roles y Permisos', Icon: Icons.Lock },
    { path: '/admin/settings/catalogs', label: 'Catálogos', Icon: Icons.Layers },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSettingsActive = settingsSubMenu.some(item => isActive(item.path));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      <aside style={{
        width: '280px',
        background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.95), rgba(30, 27, 75, 0.9))',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '24px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '4px 0 20px rgba(139, 92, 246, 0.1)',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '4px',
            margin: 0,
            letterSpacing: '-1px',
          }}>
            INDIEC
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500', margin: 0 }}>Panel de Administración</p>
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
                  background: active ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.1))' : 'transparent',
                  border: active ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  fontWeight: active ? '600' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.color = '#e2e8f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', color: 'currentColor' }}>
                  <item.Icon />
                </div>
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
                background: isSettingsActive ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.1))' : 'transparent',
                border: isSettingsActive ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                transition: 'all 0.3s ease',
                fontWeight: isSettingsActive ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isSettingsActive) {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSettingsActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#cbd5e1';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icons.Settings />
                </div>
                <span>Configuración</span>
              </div>
              <div style={{ 
                transition: 'transform 0.3s', 
                transform: showSettingsMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Icons.ChevronDown />
              </div>
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
                        color: active ? '#8b5cf6' : '#94a3b8',
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
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                        <item.Icon />
                      </div>
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
          height: '72px',
          background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.8), rgba(30, 27, 75, 0.6))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: '#e2e8f0',
            margin: 0,
          }}>
            Administración
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/client/home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s ease',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8b5cf6';
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icons.ExternalLink />
              Ver sitio
            </Link>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '16px',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
            >
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