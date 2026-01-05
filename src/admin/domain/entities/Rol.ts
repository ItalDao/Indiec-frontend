export interface Rol {
  id: string;
  nombre: string;
  permisos: string[];
  estado: 'activo' | 'inactivo';
}
