
export interface DashboardStat {
  label: string;
  value: string;
  icon: string;
  change: string;
}

export interface DashboardEvento {
  id: number;
  nombre: string;
  fecha: string;
  artista: string;
  asistentes: number;
  estado: 'Próximo' | 'En curso' | 'Finalizado';
}

export interface DashboardUsuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  registro: string;
  estado: 'Activo' | 'Inactivo';
}

export interface DashboardReport {
  eventosStats: DashboardStat[];
  usuariosStats: DashboardStat[];
  eventosRecientes: DashboardEvento[];
  usuariosRecientes: DashboardUsuario[];
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