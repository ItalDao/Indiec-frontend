
// ========== DOMAIN ==========
// Models
export type { Rol, CreateRolDTO, UpdateRolDTO } from './domain/models/Rol';
export type { 
  UsuarioAdmin, 
  CreateUsuarioDTO, 
  UpdateUsuarioDTO 
} from './domain/models/UsuarioAdmin';
export type { 
  DashboardStat,
  DashboardEvento,
  DashboardUsuario,
  DashboardReport 
} from './domain/models/DashboardStats';

// Repositories
export type { RolRepository } from './domain/repositories/RolRepository';
export type { UsuarioRepository } from './domain/repositories/UsuarioRepository';

// ========== INFRASTRUCTURE ==========
export { rolRepository } from './infrastructure/api/rolApi';
export { usuarioRepository } from './infrastructure/api/usuarioApi';

// ========== APPLICATION - USE CASES ==========
// Roles
export { getRoles } from './application/usecases/roles/getRoles';
export { getRolById } from './application/usecases/roles/getRolById';
export { createRol } from './application/usecases/roles/createRol';
export { updateRol } from './application/usecases/roles/updateRol';
export { deleteRol } from './application/usecases/roles/deleteRol';
export { toggleRolEstado } from './application/usecases/roles/toggleRolEstado';

// Usuarios
export { getUsuarios } from './application/usecases/usuarios/getUsuarios';
export { getUsuarioById } from './application/usecases/usuarios/getUsuarioById';
export { createUsuario } from './application/usecases/usuarios/createUsuario';
export { updateUsuario } from './application/usecases/usuarios/updateUsuario';
export { deleteUsuario } from './application/usecases/usuarios/deleteUsuario';
export { resetPassword } from './application/usecases/usuarios/resetPassword';

// Dashboard
export { getDashboardReport } from './application/usecases/dashboard/getDashboardReport';

// ========== PRESENTATION ==========
// Hooks
export { useRoles } from './presentation/hooks/useRoles';
export { useUsuarios } from './presentation/hooks/useUsuarios';

// Components
export { StatsCard } from './presentation/components/StatsCard';

// Pages
export { default as DashboardPage } from './presentation/pages/Dashboard';
export { default as RolesPage } from './presentation/pages/RolesPage';
export { default as UsuariosPage } from './presentation/pages/UsuariosPage';