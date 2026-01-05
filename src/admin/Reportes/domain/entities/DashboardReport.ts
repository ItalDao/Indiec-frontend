import type { DashboardEvento } from './DashboardEvento';
import type { DashboardUsuario } from './DashboardUsuario';
import type { DashboardStat } from './DashboardStat';

export interface DashboardReport {
  /* 🔹 LO QUE YA EXISTE (NO TOCAR) */
  eventosStats: DashboardStat[];
  usuariosStats: DashboardStat[];
  eventosRecientes: DashboardEvento[];
  usuariosRecientes: DashboardUsuario[];

  /* 🔹 NUEVO – MÉTRICAS GENERALES */
  artistas: {
    activos: number;
    inactivos: number;
  };

  canciones: {
    total: number;
    nuevasPeriodo: number;
  };

  eventos: {
    proximos: number;
    enCurso: number;
    finalizados: number;
  };

  productos: {
    activos: number;
    stockBajo: number;
  };

  /* 🔹 NUEVO – ALERTAS */
  alertas: {
    eventosProximos: DashboardEvento[];
    productosStockBajo: {
      id: string;
      nombre: string;
      stock: number;
    }[];
    artistasSinCanciones: {
      id: string;
      nombre: string;
    }[];
  };
}
