// src/apps/client/songs/infrastructure/api/favoritesApi.ts
const FAVORITES_KEY = 'indiec_favorite_songs';

export const favoritesService = {
  getFavorites(): number[] {
    const favs = localStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
  },

  addFavorite(songId: number): void {
    const favs = this.getFavorites();
    if (!favs.includes(songId)) {
      favs.push(songId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    }
  },

  removeFavorite(songId: number): void {
    const favs = this.getFavorites();
    const filtered = favs.filter(id => id !== songId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  },

  isFavorite(songId: number): boolean {
    return this.getFavorites().includes(songId);
  }
};