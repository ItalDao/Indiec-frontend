import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Icons } from '../../../apps/client/songs/presentation/components/Icons';

const AdminLayout = () => {
  const location = useLocation();
  const [showSettingsMenu, setShowSettingsMenu] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Agregar estilos CSS para el scrollbar personalizado
  const scrollbarStyles = `
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(139, 92, 246, 0.25);
      border-radius: 3px;
      transition: background 0.3s ease;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(139, 92, 246, 0.4);
    }
  `;

  const menuItems = [
    { path: '/admin/dashboard', label: 'Panel', Icon: Icons.BarChart3 },
    { path: '/admin/artists', label: 'Artistas', Icon: Icons.Mic2 },
    { path: '/admin/songs', label: 'Canciones', Icon: Icons.Music2 },
    { path: '/admin/events', label: 'Eventos', Icon: Icons.Calendar },
    { path: '/admin/store', label: 'Tienda', Icon: Icons.ShoppingBag },
    { path: '/admin/catalogs', label: 'Catálogos', Icon: Icons.Layers },
    
  ];

  const settingsSubMenu = [
    { path: '/admin/users', label: 'Usuarios', Icon: Icons.Users },
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
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <style>{scrollbarStyles}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: sidebarOpen ? '290px' : '88px',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.99) 0%, rgba(20, 28, 60, 0.97) 25%, rgba(25, 20, 55, 0.98) 50%, rgba(20, 28, 60, 0.97) 75%, rgba(15, 23, 42, 0.99) 100%)',
        backdropFilter: 'blur(32px)',
        borderRight: '1px solid rgba(139, 92, 246, 0.15)',
        padding: sidebarOpen ? '28px 20px' : '16px 12px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '12px 0 48px rgba(139, 92, 246, 0.1), inset 1px 0 rgba(200, 150, 255, 0.08)',
        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 100,
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: sidebarOpen ? '36px' : '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: sidebarOpen ? '20px' : '12px',
          borderBottom: sidebarOpen ? '1px solid rgba(139, 92, 246, 0.15)' : 'none',
        }}>
          {sidebarOpen && (
            <div>
              <h1 style={{
                fontSize: '26px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 50%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                letterSpacing: '-0.8px',
              }}>
                INDIEC
              </h1>
              <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.05))',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              padding: '10px',
              color: '#9d8bde',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: sidebarOpen ? 'scaleX(-1)' : 'scaleX(1)',
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(99, 102, 241, 0.12))';
              e.currentTarget.style.color = '#c4b5fd';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = sidebarOpen ? 'scaleX(-1) scale(1.08)' : 'scaleX(1) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.05))';
              e.currentTarget.style.color = '#9d8bde';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
              e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = sidebarOpen ? 'scaleX(-1)' : 'scaleX(1)';
            }}
          >
            <Icons.ChevronRight />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                  gap: sidebarOpen ? '14px' : '0',
                  padding: sidebarOpen ? '13px 15px' : '13px 10px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: active ? '#e9d5ff' : '#9d8bde',
                  background: active 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.12))'
                    : 'transparent',
                  border: active ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
                  transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  fontWeight: active ? '700' : '600',
                  fontSize: sidebarOpen ? '15px' : '0',
                  cursor: 'pointer',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: active ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(139, 92, 246, 0.15)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                    e.currentTarget.style.color = '#c4b5fd';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                    if (sidebarOpen) {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(139, 92, 246, 0.1)';
                    }
                  } else {
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 6px 20px rgba(139, 92, 246, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#9d8bde';
                    e.currentTarget.style.borderColor = 'transparent';
                    if (sidebarOpen) {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  } else {
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(139, 92, 246, 0.15)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', color: 'currentColor', minWidth: '24px', justifyContent: 'center' }}>
                  <item.Icon />
                </div>
                {sidebarOpen && <span style={{ letterSpacing: '-0.3px' }}>{item.label}</span>}
              </Link>
            );
          })}

          {/* Settings */}
          <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}>
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarOpen ? 'space-between' : 'center',
                gap: '14px',
                padding: sidebarOpen ? '13px 15px' : '13px 10px',
                borderRadius: '10px',
                color: isSettingsActive ? '#e9d5ff' : '#9d8bde',
                background: isSettingsActive 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.12))'
                  : 'transparent',
                border: isSettingsActive ? '1px solid rgba(139, 92, 246, 0.35)' : '1px solid transparent',
                transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fontWeight: isSettingsActive ? '700' : '600',
                fontSize: sidebarOpen ? '15px' : '0',
                cursor: 'pointer',
                boxShadow: isSettingsActive ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(139, 92, 246, 0.15)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isSettingsActive) {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                  e.currentTarget.style.color = '#c4b5fd';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                  if (sidebarOpen) {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(139, 92, 246, 0.1)';
                  }
                } else {
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 6px 20px rgba(139, 92, 246, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSettingsActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#9d8bde';
                  e.currentTarget.style.borderColor = 'transparent';
                  if (sidebarOpen) {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                } else {
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(139, 92, 246, 0.15)';
                }
              }}
              title={!sidebarOpen ? 'Configuración' : ''}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sidebarOpen ? '14px' : '0', minWidth: '24px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: 'currentColor' }}>
                  <Icons.Settings />
                </div>
                {sidebarOpen && <span style={{ letterSpacing: '-0.3px' }}>Configuración</span>}
              </div>
              {sidebarOpen && (
                <div style={{ 
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
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
              <div style={{ marginLeft: '12px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                        padding: '11px 14px',
                        borderRadius: '9px',
                        textDecoration: 'none',
                        color: active ? '#c4b5fd' : '#7c7084',
                        background: active ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        fontSize: '13px',
                        fontWeight: active ? '600' : '500',
                        borderLeft: active ? '2px solid #9d8bde' : '2px solid transparent',
                        paddingLeft: active ? '12px' : '14px',
                        cursor: 'pointer',
                        boxShadow: active ? 'inset 0 1px 0 rgba(255, 255, 255, 0.05)' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#9d8bde';
                          e.currentTarget.style.transform = 'translateX(3px)';
                          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                          e.currentTarget.style.borderLeftColor = 'rgba(139, 92, 246, 0.2)';
                        } else {
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 2px 8px rgba(139, 92, 246, 0.12)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#7c7084';
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                        } else {
                          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'currentColor' }}>
                        <item.Icon />
                      </div>
                      <span style={{ letterSpacing: '-0.2px' }}>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: sidebarOpen ? '290px' : '88px', flex: 1, display: 'flex', flexDirection: 'column', transition: 'margin-left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        {/* TOPBAR */}
        <header style={{
          height: '80px',
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 27, 75, 0.95) 40%, rgba(26, 31, 58, 0.98) 100%)',
          backdropFilter: 'blur(32px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'box-shadow 0.3s ease',
        }}>
          {/* Left side - Page title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '3px',
              height: '40px',
              background: 'linear-gradient(180deg, #8b5cf6 0%, #6366f1 50%, #a78bfa 100%)',
              borderRadius: '2px',
              boxShadow: '0 0 16px rgba(139, 92, 246, 0.6)',
            }}></div>
            <div>
              <h2 style={{ 
                fontSize: 'clamp(18px, 2vw, 24px)', 
                fontWeight: '800', 
                color: '#e2e8f0',
                margin: 0,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {getPageTitle()}
              </h2>
              <p style={{
                fontSize: '11px',
                color: '#64748b',
                margin: '2px 0 0 0',
                fontWeight: '500',
                letterSpacing: '0.5px',
              }}>Panel de Administración</p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Ver sitio Button */}
            <Link
              to="/client/home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '13px',
                padding: '10px 18px',
                borderRadius: '10px',
                border: '1.5px solid rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: '600',
                background: 'rgba(139, 92, 246, 0.08)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8b5cf6';
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icons.ExternalLink style={{ width: '16px', height: '16px' }} />
              <span>Ver sitio</span>
            </Link>

            {/* Divider */}
            <div style={{
              width: '1px',
              height: '32px',
              background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
            }}></div>

            {/* User Avatar */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '18px',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.12) translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
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
    </div>
  );
};

export default AdminLayout;