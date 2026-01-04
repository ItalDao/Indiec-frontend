import type { RoleRepository } from '../../domain/repositories/RoleRepository';
import type { Role } from '../../domain/entities/Role';

const allPermissions = [
  "Gestionar artistas",
  "Gestionar canciones",
  "Gestionar eventos",
  "Gestionar productos",
  "Gestionar usuarios",
  "Gestionar roles",
  "Configurar sistema",
  "Ver reportes",
  "Moderar contenido",
];

const mockData: Role[] = [
  { 
    id: "1", 
    name: "Super Admin", 
    permissions: allPermissions, 
    usersCount: 1 
  },
  { 
    id: "2", 
    name: "Gestor de Artistas", 
    permissions: ["Gestionar artistas", "Ver reportes"], 
    usersCount: 3 
  },
  { 
    id: "3", 
    name: "Gestor de Contenido", 
    permissions: ["Gestionar canciones", "Gestionar eventos", "Moderar contenido", "Ver reportes"], 
    usersCount: 5 
  },
  { 
    id: "4", 
    name: "Gestor de Tienda", 
    permissions: ["Gestionar productos", "Ver reportes"], 
    usersCount: 2 
  },
];

export class RoleMock implements RoleRepository {
  private roles: Role[] = [...mockData];

  async getAll(): Promise<Role[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.roles]);
      }, 300);
    });
  }

  async getById(id: string): Promise<Role | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const role = this.roles.find(r => r.id === id) || null;
        resolve(role ? { ...role } : null);
      }, 200);
    });
  }

  async create(role: Omit<Role, 'id'>): Promise<Role> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRole: Role = {
          ...role,
          id: Date.now().toString(),
        };
        this.roles.push(newRole);
        console.log('Rol creado (mock):', newRole);
        resolve(newRole);
      }, 500);
    });
  }

  async update(role: Role): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.roles.findIndex(r => r.id === role.id);
        if (index !== -1) {
          this.roles[index] = { ...role };
          console.log('Rol actualizado (mock):', role);
        }
        resolve();
      }, 500);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.roles = this.roles.filter(r => r.id !== id);
        console.log('Rol eliminado (mock):', id);
        resolve();
      }, 400);
    });
  }
}