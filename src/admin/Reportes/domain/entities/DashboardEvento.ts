export interface DashboardEvento {
  id: number;
  nombre: string;
  fecha: string;
  artista: string;
  asistentes: number;
  estado: 'Próximo' | 'En curso' | 'Finalizado';
}
