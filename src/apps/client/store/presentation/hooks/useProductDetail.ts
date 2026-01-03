import { useEffect, useState } from 'react';
import type { Product } from '../../domain/models/Product';
import { productApi } from '../../infrastructure/api/productApi';
import { getProductById } from '../../application/usecases/getProductById';
import { getMockProductById } from '../../infrastructure/mocks/mockProducts';

export const useProductDetail = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProduct = async () => {
    setLoading(true);
    const data = import.meta.env.DEV ? await getMockProductById(id) : await getProductById(productApi)(id);
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  return { product, loading };
};
