export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string; // Relacionado con tu catálogo de Categorías
  sizeId: string;     // Relacionado con tu catálogo de Tallas
  color: string;      // Ej: "Negro", "Blanco"
  imageUrl: string;   // URL de la imagen
  status: ProductStatus;
}