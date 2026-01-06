export interface Artist {
  id: number;
  nombre: string;
  genero: string;
  pais: string;
  imagen: string;
  seguidores: number;
  email: string;
  estado: 'activo' | 'inactivo';
}

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 1,
    nombre: 'Victorz',
    genero: 'Rock',
    pais: 'Colombia',
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
    seguidores: 15420,
    email: 'victorz@example.com',
    estado: 'activo',
  },
  {
    id: 2,
    nombre: 'María García',
    genero: 'Pop',
    pais: 'México',
    imagen: 'https://tse3.mm.bing.net/th/id/OIP.v2ChtIVt5FfeqlE5V0x2TQHaE8?rs=1&pid=ImgDetMain&o=7&rm=320',
    seguidores: 28650,
    email: 'maria@example.com',
    estado: 'activo',
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    genero: 'Jazz',
    pais: 'Argentina',
    imagen: 'https://tse3.mm.bing.net/th/id/OIP.jKOX7uuy0Z3D1-5xPigGpgHaE8?w=1280&h=854&rs=1&pid=ImgDetMain&o=7&rm=320',
    seguidores: 9340,
    email: 'carlos@example.com',
    estado: 'activo',
  },
  {
    id: 4,
    nombre: 'Laura Martínez',
    genero: 'Indie',
    pais: 'Chile',
    imagen: 'https://comunhao.com.br/wp-content/uploads/2020/04/central-3.jpg?q=80&w=400&auto=format&fit=crop', 
    seguidores: 12780,
    email: 'laura@example.com',
    estado: 'activo',
  },
  {
    id: 5,
    nombre: 'David López',
    genero: 'Electrónica',
    pais: 'España',
    imagen: 'https://media.istockphoto.com/id/852214814/photo/man-singing-on-microphone.jpg?s=612x612&w=0&k=20&c=u8MzzqMuPKto_2ZCnH1zDRLRuaODrSP580JOWfdsw_s=',
    seguidores: 34210,
    email: 'david@example.com',
    estado: 'inactivo',
  },
  {
    id: 6,
    nombre: 'Sofia Sánchez',
    genero: 'Reggaeton',
    pais: 'Puerto Rico',
    imagen: 'https://cress.gigsalad.com/s3/t/the_innocent_bystanders_san_diego/64a2d55d81fd0_480_sq',
    seguidores: 45680,
    email: 'sofia@example.com',
    estado: 'activo',
  },
];
