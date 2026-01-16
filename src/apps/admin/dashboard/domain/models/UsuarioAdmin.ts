export interface UsuarioAdmin {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  rolId: string;
  rol?: string;
  estado: 'activo' | 'inactivo';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUsuarioDTO {
  nombre: string;
  email: string;
  password: string;
  rolId: string;
  estado: 'activo' | 'inactivo';
}

export interface UpdateUsuarioDTO {
  id: string;
  nombre?: string;
  email?: string;
  password?: string;
  rolId?: string;
  estado?: 'activo' | 'inactivo';
}