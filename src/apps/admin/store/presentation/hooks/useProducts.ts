import { useState, useEffect } from "react";
import { ProductMock } from "../../infrastructure/mocks/ProductMock";
import type { Product } from "../../domain/entities/Product";

// Instanciamos el repositorio falso
const repository = new ProductMock();

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await repository.getAll();
    // Filtramos solo los activos para el listado principal
    setProducts(data.filter(p => p.status === 'active'));
    setLoading(false);
  };

  const createProduct = async (product: Omit<Product, "id">) => {
    setLoading(true);
    await repository.create(product);
    await loadProducts(); // Recargamos la lista
    setLoading(false);
  };

  const updateProduct = async (product: Product) => {
    setLoading(true);
    await repository.update(product);
    await loadProducts();
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    setLoading(true);
    await repository.delete(id);
    await loadProducts();
    setLoading(false);
  };

  return {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    refresh: loadProducts
  };
};