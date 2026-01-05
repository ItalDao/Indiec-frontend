export type User = {
  id: number;
  name: string;
  email: string;
  city: string;
  country: string;
  photo?: string;
};

// 🔹 Usuario de ejemplo
export const mockUser: User = {
  id: 1,
  name: 'Santiago Alomoto',
  email: 'santiago@email.com',
  city: 'Quito',
  country: 'Ecuador',
  photo: '', // o url de foto
};

// 🔹 Notificaciones de ejemplo
export const mockUserNotifications = {
  email: true,
  push: false,
  releases: true,
  offers: true,
};
