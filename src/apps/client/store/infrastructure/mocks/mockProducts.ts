// src/apps/client/store/infrastructure/mocks/mockProducts.ts

import type { Product } from '../../domain/models/Product';
import camisetaNegra from '../../../../../assets/products/camiseta-negra.jpg';
import Sudadera from '../../../../../assets/products/Sudadera.jpg';
import gorra from '../../../../../assets/products/gorra.png';

// 🔹 Productos de ejemplo
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Camiseta Indie Negra',
    description: 'Camiseta oficial IndieC de algodón premium',
    price: 19.99,
    image: camisetaNegra,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco'],
    category: 'camiseta',
    stock: 25,
  },
  {
    id: 2,
    name: 'Hoodie Indie Gris',
    description: 'Hoodie cómoda y abrigada para conciertos',
    price: 39.99,
    image: Sudadera,
    sizes: ['M', 'L', 'XL'],
    colors: ['Gris', 'Negro'],
    category: 'hoodie',
    stock: 12,
  },
  {
    id: 3,
    name: 'Gorra Indie Negra',
    description: 'Gorra oficial IndieC ajustable',
    price: 14.99,
    image: gorra,
    sizes: ['Única'],
    colors: ['Negro'],
    category: 'gorra',
    stock: 30,
  },
];

// 🔹 Obtener todos los productos
export const getMockProducts = async (): Promise<Product[]> => {
  return [...mockProducts];
};

// 🔹 Obtener producto por ID
export const getMockProductById = async (
  id: number
): Promise<Product | null> => {
  return mockProducts.find(p => p.id === id) ?? null;
};
