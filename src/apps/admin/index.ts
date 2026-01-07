
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
export { getRoles } from '../../admin/usecases/roles/getRoles';
export { getRolById } from '../../admin/usecases/roles/getRolById';
export { createRol } from '../../admin/usecases/roles/createRol';
export { updateRol } from '../../admin/usecases/roles/updateRol';
export { deleteRol } from '../../admin/usecases/roles/deleteRol';
export { toggleRolEstado } from '../../admin/usecases/roles/toggleRolEstado';

// Usuarios
export { getUsuarios } from '../../admin/usecases/usuarios/getUsuarios';
export { getUsuarioById } from '../../admin/usecases/usuarios/getUsuarioById';
export { createUsuario } from '../../admin/usecases/usuarios/createUsuario';
export { updateUsuario } from '../../admin/usecases/usuarios/updateUsuario';
export { deleteUsuario } from '../../admin/usecases/usuarios/deleteUsuario';
export { resetPassword } from '../../admin/usecases/usuarios/resetPassword';

// Dashboard
export { getDashboardReport } from '../../admin/usecases/dashboard/getDashboardReport';

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