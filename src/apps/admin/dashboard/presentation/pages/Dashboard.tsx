
import { useNavigate } from 'react-router-dom';
import { getDashboardReport } from '../../application/usecases/dashboard/getDashboardReport';
import type { DashboardStat, DashboardEvento, DashboardUsuario } from '../../domain/models/DashboardReport';

export default function DashboardPage() {
  const navigate = useNavigate();
  const report = getDashboardReport();

  const {
    eventosStats,
    eventosRecientes,
    usuariosRecientes,
    artistas,
    canciones,
    eventos,
    productos,
    alertas,
  } = report;

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
    },
    alertBox: {
      background: 'rgba(234, 179, 8, 0.1)',
      border: '1px solid rgba(234, 179, 8, 0.3)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    alertTitle: {
      fontWeight: '600',
      color: '#facc15',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    alertList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    alertItem: {
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
      marginBottom: '0.5rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    grid4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2.5rem',
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      marginBottom: '2.5rem',
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2.5rem',
    },
    card: {
      background: 'var(--background-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.2s',
    },
    cardHover: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    metricCard: {
      background: 'var(--background-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
    },
    metricHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
    },
    metricIcon: {
      fontSize: '2rem',
    },
    badge: {
      fontSize: '0.75rem',
      fontWeight: '600',
      padding: '0.25rem 0.75rem',
      borderRadius: '999px',
    },
    badgeGreen: {
      background: 'rgba(34, 197, 94, 0.15)',
      color: '#4ade80',
    },
    badgeBlue: {
      background: 'rgba(59, 130, 246, 0.15)',
      color: '#60a5fa',
    },
    badgeRed: {
      background: 'rgba(239, 68, 68, 0.15)',
      color: '#f87171',
    },
    metricLabel: {
      color: 'var(--text-secondary)',
      fontSize: '0.85rem',
      marginBottom: '0.5rem',
    },
    metricValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    metricDetail: {
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '0.75rem',
      marginBottom: '2.5rem',
    },
    button: {
      padding: '0.875rem 1rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.95rem',
    },
    buttonPrimary: {
      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      color: 'white',
    },
    filterButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      marginBottom: '2.5rem',
    },
    filterButton: {
      padding: '0.625rem 1rem',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      background: 'var(--background-card)',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem',
    },
    listCard: {
      background: 'var(--background-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    listHeader: {
      padding: '1.25rem 1.5rem',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listTitle: {
      fontWeight: '600',
      fontSize: '1.1rem',
    },
    listBody: {
      padding: '1.5rem',
    },
    listItem: {
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      marginBottom: '0.75rem',
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: '600',
      whiteSpace: 'nowrap',
    },
    link: {
      color: '#818cf8',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  } as const;

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Panel</h1>
        <p style={styles.subtitle}>Panel de control Indie Nexus</p>
      </div>

      {/* ALERTAS */}
      {(alertas.eventosProximos.length > 0 || 
        alertas.productosStockBajo.length > 0 || 
        alertas.artistasSinCanciones.length > 0) && (
        <div style={styles.alertBox}>
          <h3 style={styles.alertTitle}>
            <span>⚠️</span> Alertas importantes
          </h3>
          <ul style={styles.alertList}>
            {alertas.eventosProximos.length > 0 && (
              <li style={styles.alertItem}>• {alertas.eventosProximos.length} evento(s) próximo(s) en los próximos 7 días</li>
            )}
            {alertas.productosStockBajo.length > 0 && (
              <li style={styles.alertItem}>• {alertas.productosStockBajo.length} producto(s) con stock bajo</li>
            )}
            {alertas.artistasSinCanciones.length > 0 && (
              <li style={styles.alertItem}>• {alertas.artistasSinCanciones.length} artista(s) sin canciones registradas</li>
            )}
          </ul>
        </div>
      )}

      {/* MÉTRICAS GENERALES */}
      <section>
        <h2 style={styles.sectionTitle}>
          <span>📊</span> Métricas Generales
        </h2>
        <div style={styles.grid4}>
          
          {/* Artistas */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricIcon}>👥</span>
              <span style={{...styles.badge, ...styles.badgeGreen}}>
                {artistas.activos} activos
              </span>
            </div>
            <p style={styles.metricLabel}>Total Artistas</p>
            <p style={styles.metricValue}>{artistas.activos + artistas.inactivos}</p>
            <p style={styles.metricDetail}>
              {artistas.activos} activos • {artistas.inactivos} inactivos
            </p>
          </div>

          {/* Canciones */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricIcon}>🎵</span>
              <span style={{...styles.badge, ...styles.badgeGreen}}>
                +{canciones.nuevasPeriodo}
              </span>
            </div>
            <p style={styles.metricLabel}>Canciones totales</p>
            <p style={styles.metricValue}>{canciones.total}</p>
            <p style={styles.metricDetail}>{canciones.nuevasPeriodo} nuevas este mes</p>
          </div>

          {/* Eventos */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricIcon}>📅</span>
              <span style={{...styles.badge, ...styles.badgeBlue}}>
                {eventos.proximos} próximos
              </span>
            </div>
            <p style={styles.metricLabel}>Total Eventos</p>
            <p style={styles.metricValue}>
              {eventos.proximos + eventos.enCurso + eventos.finalizados}
            </p>
            <p style={styles.metricDetail}>
              {eventos.enCurso} en curso • {eventos.finalizados} finalizados
            </p>
          </div>

          {/* Productos */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricIcon}>📦</span>
              {productos.stockBajo > 0 && (
                <span style={{...styles.badge, ...styles.badgeRed}}>
                  ⚠ {productos.stockBajo}
                </span>
              )}
            </div>
            <p style={styles.metricLabel}>Total de productos</p>
            <p style={styles.metricValue}>{productos.activos}</p>
            <p style={styles.metricDetail}>{productos.stockBajo} con stock bajo</p>
          </div>
        </div>
      </section>

      {/* ACCESOS RÁPIDOS */}
      <section>
        <h2 style={styles.sectionTitle}>⚡ Accesos rápidos</h2>
        <div style={styles.buttonGrid}>
          <button 
            style={{...styles.button, ...styles.buttonPrimary}}
            onClick={() => navigate('/admin/artists')}
          >
            + Crear Artista
          </button>
          <button 
            style={{...styles.button, background: '#9333ea', color: 'white'}}
            onClick={() => navigate('/admin/songs')}
          >
            + Crear Canción
          </button>
          <button 
            style={{...styles.button, background: '#16a34a', color: 'white'}}
            onClick={() => navigate('/admin/events')}
          >
            + Crear Evento
          </button>
          <button 
            style={{...styles.button, background: '#ea580c', color: 'white'}}
            onClick={() => navigate('/admin/store')}
          >
            + Crear Producto
          </button>
        </div>
      </section>

      {/* FILTROS EVENTOS */}
      <section>
        <h2 style={styles.sectionTitle}>🔍 Filtros Rápidos - Eventos</h2>
        <div style={styles.filterButtons}>
          <button 
            style={{...styles.filterButton, background: '#6366f1', color: 'white', border: 'none'}}
            onClick={() => navigate('/admin/events')}
          >
            Todos los Eventos
          </button>
          <button 
            style={styles.filterButton}
            onClick={() => navigate('/admin/events')}
          >
            ⏰ Próximos ({eventos.proximos})
          </button>
          <button 
            style={styles.filterButton}
            onClick={() => navigate('/admin/events')}
          >
            📈 En Curso ({eventos.enCurso})
          </button>
          <button 
            style={styles.filterButton}
            onClick={() => navigate('/admin/events')}
          >
            ✅ Finalizados ({eventos.finalizados})
          </button>
        </div>
      </section>

      {/* RESUMEN DE EVENTOS */}
      <section>
        <h2 style={styles.sectionTitle}>📅 Resumen de Eventos</h2>
        <div style={styles.grid3}>
          {eventosStats.map((stat: DashboardStat) => (
            <div key={stat.label} style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <span style={styles.metricIcon}>{stat.icon}</span>
                <span style={{...styles.badge, ...styles.badgeGreen}}>
                  {stat.change}
                </span>
              </div>
              <p style={styles.metricLabel}>{stat.label}</p>
              <p style={styles.metricValue}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>


      {/* LISTAS */}
      <div style={styles.grid2}>
        
        {/* EVENTOS RECIENTES */}
        <div style={styles.listCard}>
          <div style={styles.listHeader}>
            <h3 style={styles.listTitle}>⏰ Eventos Recientes</h3>
            <a 
              style={styles.link}
              onClick={() => navigate('/admin/events')}
            >
              Ver todos →
            </a>
          </div>
          <div style={styles.listBody}>
            {eventosRecientes.map((evento: DashboardEvento) => (
              <div key={evento.id} style={styles.listItem}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <strong>{evento.nombre}</strong>
                  <span style={{
                    ...styles.statusBadge,
                    background: evento.estado === 'Próximo' ? 'rgba(59, 130, 246, 0.15)' :
                              evento.estado === 'En curso' ? 'rgba(249, 115, 22, 0.15)' :
                              'rgba(34, 197, 94, 0.15)',
                    color: evento.estado === 'Próximo' ? '#60a5fa' :
                          evento.estado === 'En curso' ? '#fb923c' :
                          '#4ade80',
                    border: evento.estado === 'Próximo' ? '1px solid rgba(59, 130, 246, 0.3)' :
                           evento.estado === 'En curso' ? '1px solid rgba(249, 115, 22, 0.3)' :
                           '1px solid rgba(34, 197, 94, 0.3)',
                  }}>
                    {evento.estado}
                  </span>
                </div>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>
                  🎤 {evento.artista} • 📅 {evento.fecha}
                </p>
                <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem'}}>
                  👥 {evento.asistentes} asistentes
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* USUARIOS RECIENTES */}
        <div style={styles.listCard}>
          <div style={styles.listHeader}>
            <h3 style={styles.listTitle}>🆕 Artistas Recientes</h3>
            <a 
              style={styles.link}
              onClick={() => navigate('/admin/users')}
            >
              Ver todos →
            </a>
          </div>
          <div style={styles.listBody}>
            {usuariosRecientes.map((usuario: DashboardUsuario) => (
              <div key={usuario.id} style={styles.listItem}>
                <strong style={{display: 'block', marginBottom: '0.5rem'}}>{usuario.nombre}</strong>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                  {usuario.email}
                </p>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <span style={{
                    ...styles.statusBadge,
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}>
                    {usuario.rol}
                  </span>
                  <span style={{
                    ...styles.statusBadge,
                    background: usuario.estado === 'Activo' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                    color: usuario.estado === 'Activo' ? '#4ade80' : '#9ca3af',
                    border: usuario.estado === 'Activo' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(107, 114, 128, 0.3)',
                  }}>
                    {usuario.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTOS CON STOCK BAJO */}
        {alertas.productosStockBajo.length > 0 && (
          <div style={{...styles.listCard, borderColor: 'rgba(239, 68, 68, 0.3)'}}>
            <div style={styles.listHeader}>
              <h3 style={styles.listTitle}>🚨 Productos con Stock Bajo</h3>
            </div>
            <div style={styles.listBody}>
              {alertas.productosStockBajo.map((producto) => (
                <div key={producto.id} style={{
                  ...styles.listItem,
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <strong>{producto.nombre}</strong>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                  }}>
                    {producto.stock} unidades
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ARTISTAS SIN CANCIONES */}
        {alertas.artistasSinCanciones.length > 0 && (
          <div style={{...styles.listCard, borderColor: 'rgba(234, 179, 8, 0.3)'}}>
            <div style={styles.listHeader}>
              <h3 style={styles.listTitle}>⚠️ Artistas sin Canciones</h3>
            </div>
            <div style={styles.listBody}>
              {alertas.artistasSinCanciones.map((artista) => (
                <div key={artista.id} style={{
                  ...styles.listItem,
                  background: 'rgba(234, 179, 8, 0.05)',
                  border: '1px solid rgba(234, 179, 8, 0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <strong>{artista.nombre}</strong>
                  <button 
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#eab308',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/admin/songs')}
                  >
                    Agregar Canción
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ÚLTIMOS PRODUCTOS - ANCHO COMPLETO */}
      <section>
        <div style={styles.listCard}>
          <div style={styles.listHeader}>
            <h3 style={styles.listTitle}>🛍️ Últimos Productos</h3>
            <a 
              style={styles.link}
              onClick={() => navigate('/admin/store')}
            >
              Ver todos →
            </a>
          </div>
          <div style={styles.listBody}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '0.75rem',
            }}>
              {[
                { id: 1, nombre: 'Camiseta Indie Nexus', categoria: 'Ropa', stock: 45, estado: 'Activo' },
                { id: 2, nombre: 'Vinilo Edición Limitada', categoria: 'Música', stock: 12, estado: 'Activo' },
                { id: 3, nombre: 'Poster Tour 2024', categoria: 'Merchandising', stock: 8, estado: 'Stock Bajo' },
                { id: 4, nombre: 'Gorra Snapback', categoria: 'Ropa', stock: 0, estado: 'Agotado' },
              ].map((producto) => (
                <div key={producto.id} style={styles.listItem}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem'}}>
                    <strong>{producto.nombre}</strong>
                    <span style={{
                      ...styles.statusBadge,
                      background: producto.estado === 'Activo' ? 'rgba(34, 197, 94, 0.15)' :
                                producto.estado === 'Stock Bajo' ? 'rgba(234, 179, 8, 0.15)' :
                                'rgba(239, 68, 68, 0.15)',
                      color: producto.estado === 'Activo' ? '#4ade80' :
                            producto.estado === 'Stock Bajo' ? '#facc15' :
                            '#f87171',
                      border: producto.estado === 'Activo' ? '1px solid rgba(34, 197, 94, 0.3)' :
                             producto.estado === 'Stock Bajo' ? '1px solid rgba(234, 179, 8, 0.3)' :
                             '1px solid rgba(239, 68, 68, 0.3)',
                    }}>
                      {producto.estado}
                    </span>
                  </div>
                  <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem'}}>
                    🏷️ {producto.categoria}
                  </p>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>
                    📦 Stock: {producto.stock} unidades
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}