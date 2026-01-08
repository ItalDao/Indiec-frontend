import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Icons } from '../../../apps/client/songs/presentation/components/Icons';

const AdminLayout = () => {
  const location = useLocation();
  const [showSettingsMenu, setShowSettingsMenu] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSettingsActive = settingsSubMenu.some(item => isActive(item.path));

  const getPageTitle = () => {
    const current = [...menuItems, ...settingsSubMenu].find(item => isActive(item.path));
    return current?.label || 'Panel de Administración';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: sidebarOpen ? '280px' : '80px',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.85) 50%, rgba(26, 31, 58, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(139, 92, 246, 0.15)',
        padding: sidebarOpen ? '24px' : '16px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.12)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 100,
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: sidebarOpen ? '32px' : '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {sidebarOpen && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 50%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '4px',
                margin: '0 0 4px 0',
                letterSpacing: '-0.5px',
              }}>
                INDIEC
              </h1>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', margin: 0, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Admin</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
              padding: '8px',
              color: '#a78bfa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              transform: sidebarOpen ? 'scaleX(-1)' : 'scaleX(1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
              e.currentTarget.style.color = '#c4b5fd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
              e.currentTarget.style.color = '#a78bfa';
            }}
          >
            <Icons.ChevronRight />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarOpen ? '12px' : '0',
                  padding: sidebarOpen ? '12px 16px' : '12px 8px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: active ? '#fff' : '#cbd5e1',
                  background: active ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.15))' : 'transparent',
                  border: active ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: active ? '600' : '500',
                  fontSize: sidebarOpen ? '14px' : '0',
                  cursor: 'pointer',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                    e.currentTarget.style.color = '#e2e8f0';
                    if (sidebarOpen) e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#cbd5e1';
                    if (sidebarOpen) e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', color: 'currentColor' }}>
                  <item.Icon />
                </div>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}

          {/* Settings */}
          <div style={{ marginTop: '12px' }}>
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarOpen ? 'space-between' : 'center',
                gap: '12px',
                padding: sidebarOpen ? '12px 16px' : '12px 8px',
                borderRadius: '10px',
                color: isSettingsActive ? '#fff' : '#cbd5e1',
                background: isSettingsActive ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.15))' : 'transparent',
                border: isSettingsActive ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: isSettingsActive ? '600' : '500',
                fontSize: sidebarOpen ? '14px' : '0',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isSettingsActive) {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                  e.currentTarget.style.color = '#e2e8f0';
                  if (sidebarOpen) e.currentTarget.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSettingsActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#cbd5e1';
                  if (sidebarOpen) e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
              title={!sidebarOpen ? 'Configuración' : ''}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sidebarOpen ? '12px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icons.Settings />
                </div>
                {sidebarOpen && <span>Configuración</span>}
              </div>
              {sidebarOpen && (
                <div style={{ 
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                  transform: showSettingsMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: '0.7',
                }}>
                  <Icons.ChevronDown />
                </div>
              )}
            </button>

            {showSettingsMenu && sidebarOpen && (
              <div style={{ marginLeft: '12px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
                        padding: '10px 14px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: active ? '#c4b5fd' : '#94a3b8',
                        background: active ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                        transition: 'all 0.2s ease',
                        fontSize: '13px',
                        fontWeight: active ? '600' : '400',
                        borderLeft: active ? '2px solid #8b5cf6' : '2px solid transparent',
                        paddingLeft: active ? '12px' : '14px',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#cbd5e1';
                          e.currentTarget.style.transform = 'translateX(2px)';
                          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#94a3b8';
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
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

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: sidebarOpen ? '280px' : '80px', flex: 1, display: 'flex', flexDirection: 'column', transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        {/* TOPBAR */}
        <header style={{
          height: '72px',
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.5) 0%, rgba(30, 27, 75, 0.4) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          {/* Left side - Page title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '4px',
              height: '32px',
              background: 'linear-gradient(180deg, #8b5cf6, #6366f1)',
              borderRadius: '2px',
            }}></div>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#e2e8f0',
              margin: 0,
              letterSpacing: '-0.3px',
            }}>
              {getPageTitle()}
            </h2>
          </div>

          {/* Right side - Actions */}
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
                border: '1px solid rgba(139, 92, 246, 0.25)',
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
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icons.ExternalLink />
              Ver sitio
            </Link>

            {/* User Avatar */}
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
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
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
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;