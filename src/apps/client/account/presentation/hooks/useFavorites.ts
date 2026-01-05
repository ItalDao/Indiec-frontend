import { useEffect, useState } from 'react';
import { favoritesApi } from '../../infrastructure/api/favoritesApi';
import { mockProducts } from '../../../store/infrastructure/mocks/mockProducts';

export type Favorites = {
  products: number[];
  artists: string[];
  songs: string[];
  events: string[];
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorites>({ products: [], artists: [], songs: [], events: [] });
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    const data = import.meta.env.DEV ? await favoritesApi.getFavorites() : await favoritesApi.getFavorites();
    setFavorites(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addFavorite = async (type: keyof Favorites, value: any) => {
    await favoritesApi.addFavorite(type, value);
    await loadFavorites();
  };

  const removeFavorite = async (type: keyof Favorites, value: any) => {
    await favoritesApi.removeFavorite(type, value);
    await loadFavorites();
  };

  // Mapear productos favoritos completos
  const favoriteProducts = favorites.products
    .map(id => mockProducts.find(p => p.id === id))
    .filter((p): p is typeof mockProducts[0] => !!p);

  return {
    favorites,
    favoriteProducts,
    loading,
    addFavorite,
    removeFavorite,
    reload: loadFavorites
  };
};
