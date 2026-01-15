export interface Product {
  id?: string;
  name: string;
  category: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
  images: string[];
  active: boolean;
  createdAt?: string;
}