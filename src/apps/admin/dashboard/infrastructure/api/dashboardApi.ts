// src/apps/admin/dashboard/infrastructure/api/dashboardApi.ts

import { api } from '../../../../../shared/services/api';
import type { DashboardReport } from '../../domain/models/DashboardStats';
import type { DashboardRepository } from '../../domain/repositories/DashboardRepository';

class DashboardApiRepository implements DashboardRepository {
  private readonly basePath = '/admin/dashboard';

  async getReport(): Promise<DashboardReport> {
    try {
      return await api.get<DashboardReport>(`${this.basePath}/report`);
    } catch (error) {
      console.error('Error fetching dashboard report:', error);
      // Retornar datos mock si falla (útil para desarrollo)
      return this.getMockReport();
    }
  }

  private getMockReport(): DashboardReport {
    return {
      eventosStats: [
        {
          label: 'Eventos Totales',
          value: '3',
          icon: 'calendar',
          change: '+12%',
        },
        {
          label: 'Próximos',
          value: '2',
          icon: 'clock',
          change: '+5%',
        },
      ],
      usuariosStats: [
        {
          label: 'Usuarios Activos',
          value: '1,247',
          icon: 'users',
          change: '+18%',
        },
        {
          label: 'Nuevos este mes',
          value: '89',
          icon: 'star',
          change: '+23%',
        },
      ],
      eventosRecientes: [
        {
          id: 1,
          nombre: 'Concierto Rock Nacional',
          fecha: '2026-01-15',
          artista: 'Los Independientes',
          asistentes: 250,
          estado: 'Próximo',
        },
        {
          id: 2,
          nombre: 'Festival Indie',
          fecha: '2026-01-20',
          artista: 'Varios Artistas',
          asistentes: 500,
          estado: 'Próximo',
        },
        {
          id: 3,
          nombre: 'Acústico Íntimo',
          fecha: '2026-01-08',
          artista: 'María Sonidos',
          asistentes: 80,
          estado: 'Finalizado',
        },
      ],
      usuariosRecientes: [
        {
          id: 1,
          nombre: 'Ana García',
          email: 'ana.garcia@email.com',
          rol: 'Admin',
          registro: '2026-01-09',
          estado: 'Activo',
        },
        {
          id: 2,
          nombre: 'Carlos López',
          email: 'carlos.lopez@email.com',
          rol: 'Editor',
          registro: '2026-01-08',
          estado: 'Activo',
        },
        {
          id: 3,
          nombre: 'Diana Torres',
          email: 'diana.torres@email.com',
          rol: 'Viewer',
          registro: '2026-01-07',
          estado: 'Activo',
        },
      ],
      artistas: {
        activos: 45,
        inactivos: 8,
      },
      canciones: {
        total: 234,
        nuevasPeriodo: 18,
      },
      eventos: {
        proximos: 2,
        enCurso: 0,
        finalizados: 1,
      },
      productos: {
        activos: 67,
        stockBajo: 2,
      },
      alertas: {
        eventosProximos: [
          {
            id: 1,
            nombre: 'Concierto Rock Nacional',
            fecha: '2026-01-15',
            artista: 'Los Independientes',
            asistentes: 250,
            estado: 'Próximo',
          },
          {
           id: 2,
           nombre: 'Festival de Jazz',
           fecha: '2026-01-18',
           artista: 'Jazz Ensemble',
           asistentes: 180,
           estado: 'Próximo',
          },
        ],
        productosStockBajo: [
          { id: '1', nombre: 'Camiseta Band Logo', stock: 3 },
          { id: '2', nombre: 'Vinilo Edición Limitada', stock: 2 },
        ],
        artistasSinCanciones: [
          { id: '1', nombre: 'Nuevo Artista Sin Tracks' },
        ],
      },
    };
  }
}

export const dashboardRepository = new DashboardApiRepository();