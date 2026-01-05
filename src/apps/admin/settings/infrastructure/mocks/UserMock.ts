import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { User } from '../../domain/entities/User';

const mockData: User[] = [
  { id: "1", name: "Admin Principal", email: "admin@indiec.com", role: "Super Admin", status: "active" },
  { id: "2", name: "Juan Pérez", email: "juan@indiec.com", role: "Gestor de Artistas", status: "active" },
  { id: "3", name: "María García", email: "maria@indiec.com", role: "Gestor de Contenido", status: "inactive" },
];

export class UserMock implements UserRepository {
  private users: User[] = [...mockData];

  async getAll(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.users]);
      }, 300);
    });
  }

  async getById(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === id) || null;
        resolve(user ? { ...user } : null);
      }, 200);
    });
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...user,
          id: Date.now().toString(),
        };
        this.users.push(newUser);
        console.log('Usuario creado (mock):', newUser);
        resolve(newUser);
      }, 500);
    });
  }

  async update(user: User): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = { ...user };
          console.log('Usuario actualizado (mock):', user);
        }
        resolve();
      }, 500);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users = this.users.filter(u => u.id !== id);
        console.log('Usuario eliminado (mock):', id);
        resolve();
      }, 400);
    });
  }

  async toggleStatus(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === id);
        if (user) {
          user.status = user.status === "active" ? "inactive" : "active";
          console.log('Estado cambiado (mock):', user);
        }
        resolve();
      }, 300);
    });
  }
}