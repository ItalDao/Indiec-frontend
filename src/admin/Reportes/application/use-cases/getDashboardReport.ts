import type { DashboardReport } from '../../domain/entities/DashboardReport';

export const getDashboardReport = (): DashboardReport => {
  return {
    /* 🔹 LO QUE YA EXISTE (NO TOCAR) */
    eventosStats: [
      { label: 'Total Eventos', value: '24', icon: '📅', change: '+8' },
      { label: 'Eventos Activos', value: '8', icon: '📈', change: '+3' },
      { label: 'Eventos Finalizados', value: '16', icon: '✅', change: '+4' },
    ],

    usuariosStats: [
      { label: 'Total Usuarios', value: '156', icon: '👥', change: '+12' },
      { label: 'Administradores', value: '5', icon: '👤', change: '+1' },
      { label: 'Usuarios Activos', value: '142', icon: '📈', change: '+8%' },
    ],

    eventosRecientes: [
      {
        id: 1,
        nombre: 'Festival Indie Vibes 2024',
        fecha: '2024-03-15',
        artista: 'Luna Méndez',
        asistentes: 450,
        estado: 'Próximo',
      },
      {
        id: 2,
        nombre: 'Concierto Acústico',
        fecha: '2024-03-10',
        artista: 'The Indie Collective',
        asistentes: 280,
        estado: 'En curso',
      },
    ],

    usuariosRecientes: [
      {
        id: 1,
        nombre: 'Carlos Mendoza',
        email: 'carlos.m@example.com',
        rol: 'Artista',
        registro: '2024-01-15',
        estado: 'Activo',
      },
      {
        id: 2,
        nombre: 'Ana García',
        email: 'ana.garcia@example.com',
        rol: 'Artista',
        registro: '2024-02-20',
        estado: 'Inactivo',
      },
    ],

    /* 🔹 MÉTRICAS GENERALES */
    artistas: {
      activos: 18,
      inactivos: 4,
    },

    canciones: {
      total: 200,
      nuevasPeriodo: 12,
    },

    eventos: {
      proximos: 8,
      enCurso: 2,
      finalizados: 16,
    },

    productos: {
      activos: 34,
      stockBajo: 5,
    },

    /* 🔹 ALERTAS */
    alertas: {
      eventosProximos: [
        {
          id: 3,
          nombre: 'Indie Night',
          fecha: '2024-03-12',
          artista: 'Solar Echo',
          asistentes: 0,
          estado: 'Próximo',
        },
      ],

      productosStockBajo: [
        {
          id: 'p1',
          nombre: 'Camiseta Indie',
          stock: 2,
        },
      ],

      artistasSinCanciones: [
        {
          id: 'a1',
          nombre: 'Neon Rivers',
        },
      ],
    },
  };
};
