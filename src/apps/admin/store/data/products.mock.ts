
import type { Product } from '../domain/models/Product'
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camiseta Indiec',
    category: 'Camisetas',
    size: 'M',
    color: 'Plomo',
    price: 200,
    stock: 17,
    images: [
      'https://media.istockphoto.com/id/1157599346/photo/black-baseball-cap-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=ltNry5F1DwY8hX6Zk1gCXkwfL4LUuPhfTGGmfwDs5xI=',  // Gorra negra realista (puedes cambiar por camiseta)
    ],
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Camiseta Ind',
    category: 'Camisetas',
    size: 'M',
    color: 'Negro',
    price: 20,
    stock: 15,
    images: [
      'https://i.etsystatic.com/37122585/r/il/fb2808/7035108500/il_fullxfull.7035108500_p0r5.jpg',  // Camiseta gris realista
    ],
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Gorra Indie',
    category: 'Accesorios',
    price: 15,
    stock: 8,
    images: [
      'https://www.shutterstock.com/image-photo/black-blank-baseball-caps-mock-600nw-2566716419.jpg',  // Gorra negra realista
    ],
    active: true,
    createdAt: new Date().toISOString(),
  },
];
