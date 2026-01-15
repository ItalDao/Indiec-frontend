import { api } from '../../../../../shared/services/api';
import type { Product } from '../../domain/models/Product';

export class ApiProductRepository {
  private resource = '/producto'; // Assumed endpoint; adjust if needed

  async getAll(): Promise<Product[]> {
    try {
      const response = await api.get<any>(`${this.resource}/lista`);
      if (response.data && response.data.data) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error en ApiProductRepository:", error);
      return [];
    }
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const response = await api.get<any>(`${this.resource}/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      return null;
    }
  }

  async create(product: Product): Promise<void> {
    try {
      const payload = {
        name: product.name,
        category: product.category,
        size: product.size,
        color: product.color,
        price: product.price,
        stock: product.stock,
        images: product.images,
      };
      const response = await api.post<any>(`${this.resource}/crear`, payload);
      if (response.data && response.data.success === false) {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      throw new Error(errorMsg);
    }
  }

  async update(id: string | number, product: Product): Promise<void> {
    try {
      const payload = {
        name: product.name,
        category: product.category,
        size: product.size,
        color: product.color,
        price: product.price,
        stock: product.stock,
        images: product.images,
      };
      const response = await api.put<any>(`${this.resource}/${id}`, payload);
      if (response.data && response.data.success === false) {
        throw new Error(response.data.message || 'Error al actualizar');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      throw new Error(errorMsg);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      const response = await api.delete<any>(`${this.resource}/${id}`);
      if (response.data && response.data.success === false) {
        throw new Error(response.data.message || 'Error al eliminar');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      throw new Error(errorMsg);
    }
  }
}