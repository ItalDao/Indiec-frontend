export interface UsuarioAdmin {
  id: string;
  nombre: string;
  email: string;
  rolId: string;
  estado: 'activo' | 'inactivo';
}
