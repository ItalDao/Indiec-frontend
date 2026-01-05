export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'camiseta' | 'hoodie' | 'gorra';
  artist?: string;
  image: string;
  sizes: string[];
  colors: string[];
  stock: number;
}
