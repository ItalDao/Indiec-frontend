import { useEffect, useState } from 'react';
import type { Product } from '../../domain/models/Product';
import { productApi } from '../../infrastructure/api/productApi';
import { getProducts } from '../../application/usecases/getProducts';
import { getMockProducts } from '../../infrastructure/mocks/mockProducts';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const data = import.meta.env.DEV ? await getMockProducts() : await getProducts(productApi)();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, loading };
};
