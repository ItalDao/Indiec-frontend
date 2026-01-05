// apps/client/account/infrastructure/mocks/mockFavorites.ts

export type Favorites = {
  products: number[];
  artists: string[];
  songs: string[];
  events: string[];
};

let favorites: Favorites = {
  products: [],
  artists: [],
  songs: [],
  events: [],
};

// 🔹 Obtener favoritos
export const getMockFavorites = (): Favorites => {
  return favorites;
};

// 🔹 Agregar favorito
export const addMockFavorite = <K extends keyof Favorites>(
  type: K,
  value: Favorites[K][number]
): void => {
  favorites[type] = [...favorites[type], value] as Favorites[K];
};

// 🔹 Eliminar favorito
export const removeMockFavorite = <K extends keyof Favorites>(
  type: K,
  value: Favorites[K][number]
): void => {
  favorites[type] = favorites[type].filter(
    v => v !== value
  ) as Favorites[K];
};
