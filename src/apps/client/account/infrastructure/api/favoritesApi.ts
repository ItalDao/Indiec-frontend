import {
  getMockFavorites,
  addMockFavorite,
  removeMockFavorite
} from '../mocks/mockFavorites';

export const favoritesApi = {
  async getFavorites() {
    return getMockFavorites();
  },

  async addFavorite(type: any, value: any) {
    addMockFavorite(type, value);
  },

  async removeFavorite(type: any, value: any) {
    removeMockFavorite(type, value);
  }
};
