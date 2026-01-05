import type { Rol } from '../../domain/entities/Rol';

export class RolUseCase {
  private roles: Rol[] = [
    {
      id: 'admin',
      nombre: 'Admin',
      permisos: ['crear', 'editar', 'eliminar'],
      estado: 'activo',
    },
  ];

  getAll() {
    return this.roles;
  }

  create(rol: Rol) {
    this.roles.push(rol);
  }

  delete(id: string) {
    this.roles = this.roles.filter(r => r.id !== id);
  }
}
