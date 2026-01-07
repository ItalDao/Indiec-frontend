export interface Rol {
  id: string;
  nombre: string;
  permisos: string[];
  estado: 'activo' | 'inactivo';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRolDTO {
  nombre: string;
  permisos: string[];
  estado: 'activo' | 'inactivo';
}

export interface UpdateRolDTO {
  id: string;
  nombre?: string;
  permisos?: string[];
  estado?: 'activo' | 'inactivo';
}