import type { Product } from "../../domain/entities/Product";
import type { ProductRepository } from "../../domain/repositories/ProductRepository";

// 1. DATOS INICIALES (Con las imágenes reales)
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Camiseta IndieFest 2025",
    description: "Edición limitada, algodón peruano premium.",
    price: 25.00,
    stock: 50,
    categoryId: "1",
    sizeId: "S,M,L",
    color: "Negro",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",
    status: "active",
  },
  {
    id: "2",
    name: "Hoodie Banda Principal",
    description: "Sudadera térmica con diseño exclusivo en espalda.",
    price: 45.00,
    stock: 20,
    categoryId: "2",
    sizeId: "M,L,XL",
    color: "Gris",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500",
    status: "active",
  },
  {
    id: "3",
    name: "Gorra Snapback Logo",
    description: "Bordado 3D de alta calidad, ajustable.",
    price: 15.00,
    stock: 0,
    categoryId: "2",
    sizeId: "Único",
    color: "Rojo",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=500",
    status: "inactive",
  },
  {
    id: "4",
    name: "Tote Bag Oficial",
    description: "Bolso ecológico reutilizable.",
    price: 10.00,
    stock: 100,
    categoryId: "3",
    sizeId: "Único",
    color: "Beige",
    imageUrl: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&q=80&w=500",
    status: "active",
  },
];

// 2. LA CLASE EXPORTADA (¡Esta es la parte importante que faltaba!)
export class ProductMock implements ProductRepository {
  private products: Product[] = [...INITIAL_PRODUCTS];

  async getAll(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.products]), 400);
    });
  }

  async getById(id: string): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = this.products.find((p) => p.id === id);
        resolve(product ? { ...product } : null);
      }, 200);
    });
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          ...product,
          id: Math.random().toString(36).substr(2, 9),
        };
        this.products.push(newProduct);
        resolve(newProduct);
      }, 500);
    });
  }

  async update(product: Product): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.products = this.products.map((p) =>
          p.id === product.id ? product : p
        );
        resolve();
      }, 400);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Borrado lógico: cambiamos status a inactive
        this.products = this.products.map((p) =>
          p.id === id ? { ...p, status: "inactive" } : p
        );
        resolve();
      }, 300);
    });
  }
}