import { Outlet, Link, useLocation } from 'react-router-dom';
import { colors } from '../../../shared/theme/colors';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/artists', label: 'Artistas', icon: '🎤' },
    { path: '/admin/songs', label: 'Canciones', icon: '🎵' },
    { path: '/admin/events', label: 'Eventos', icon: '🎪' },
    { path: '/admin/store', label: 'Tienda', icon: '🛍️' },
    { path: '/admin/catalogs', label: 'Catálogos', icon: '📚' },
    { path: '/admin/users', label: 'Usuarios', icon: '👥' },
    { path: '/admin/settings', label: 'Configuración', icon: '⚙️' },
  ];

  const sidebarStyles: React.CSSProperties = {
    width: '260px',
    height: '100vh',
    background: colors.backgroundLight,
    borderRight: `1px solid ${colors.border}`,
    padding: '1.5rem',
    position: 'fixed',
    left: 0,
    top: 0,
    overflowY: 'auto',
  };

  const mainStyles: React.CSSProperties = {
    marginLeft: '260px',
    minHeight: '100vh',
    background: colors.background,
  };

  const headerStyles: React.CSSProperties = {
    height: '70px',
    background: colors.backgroundLight,
    borderBottom: `1px solid ${colors.border}`,
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <div style={{ display: 'flex' }}>
      <aside style={sidebarStyles}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            <span style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              INDIEC
            </span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: colors.textMuted }}>Panel de Administración</p>
        </div>

        <nav>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  marginBottom: '0.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? colors.primary : colors.textSecondary,
                  background: isActive ? `${colors.primary}15` : 'transparent',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div style={mainStyles}>
        <header style={headerStyles}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/client/home" style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.875rem' }}>
              Ver sitio 🔗
            </Link>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
            }}>
              A
            </div>
          </div>
        </header>
        <main style={{ padding: '2rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;