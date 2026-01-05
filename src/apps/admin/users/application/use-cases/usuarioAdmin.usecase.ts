import type { UsuarioAdmin } from '../../domain/entities/UsuarioAdmin';

export class UsuarioAdminUseCase {
  private usuarios: UsuarioAdmin[] = [];

  getAll() {
    return this.usuarios;
  }

  create(usuario: UsuarioAdmin) {
    this.usuarios.push(usuario);
  }

  update(usuarioActualizado: UsuarioAdmin) {
    this.usuarios = this.usuarios.map(u =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u
    );
  }
}
