import type { Event } from '../domain/models/Event';

export const MOCK_EVENTS: Event[] = [
  {
    idEvento: 1,
    titulo: "Summer Deep House",
    generoMusical: "Electronic",
    fecha: "2024-08-15",
    lugar: "Ibiza Beach Club",
    capacidad: 250,
    precioEntrada: 45,
    descripcion: "Una experiencia única bajo el sol con los mejores exponentes del Deep House internacional. Sonido envolvente y vista al mar.",
    imagen: "https://th.bing.com/th/id/OIP.1q7EDGbQe4dOqgOuL6tv9gHaEi?w=280&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3  ",
    estado: "programado"
  },
  {
    idEvento: 2,
    titulo: "Rock Legend Classics",
    generoMusical: "Rock",
    fecha: "2024-09-10",
    lugar: "Estadio Central",
    capacidad: 5000,
    precioEntrada: 85,
    descripcion: "Las leyendas del rock se reúnen en un solo escenario para revivir los clásicos de los 80 y 90.",
    imagen: "https://th.bing.com/th/id/OIP.BPt70TyGh0CtkTryWBgVdAHaE8?w=257&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3  ",
    estado: "programado"
  },
  {
    idEvento: 3,
    titulo: "Urban Trap Night",
    generoMusical: "Trap / Urban",
    fecha: "2024-08-20",
    lugar: "The Warehouse",
    capacidad: 150,
    precioEntrada: 20,
    descripcion: "La noche más intensa de trap con artistas emergentes de la escena local.",
    imagen: "https://th.bing.com/th/id/OIP.Tdf7jHlTZ5-p7QYF_WKd9AHaFj?w=235&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3  ",
    estado: "finalizado"
  }
];