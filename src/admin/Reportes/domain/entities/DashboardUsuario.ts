export interface DashboardUsuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  registro: string;
  estado: 'Activo' | 'Inactivo';
}