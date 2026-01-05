import type { HomeRepository } from "../domain/repositories/HomeRepository";
import type { HomeData } from "../domain/models/HomeData";
import { artistsMock } from "../mocks/artists.mock";
import { eventsMock } from "../mocks/events.mock";
import { productsMock } from "../mocks/products.mock";
import { songsMock } from "../mocks/songs.mock";

export class HomeMockRepository implements HomeRepository {

  async getHomeData(): Promise<HomeData> {
    return {
      featuredArtists: await this.getFeaturedArtists(),
      trendingSongs: await this.getNewSongs(),
      upcomingEvents: await this.getUpcomingEvents(),
      recommendedProducts: await this.getRecommendedMerch(),
    };
  }

  async getFeaturedArtists() {
    return artistsMock.filter(a => a.activo);
  }

  async getUpcomingEvents() {
    return eventsMock.filter(e => e.activo);
  }

  async getRecommendedMerch() {
    return productsMock.filter(p => p.estado === "activo");
  }

  async getNewSongs() {
    return songsMock.filter(s => s.activo);
  }

  async searchGlobal(query: string) {
    const q = query.toLowerCase();
  
    return {
      artists: artistsMock.filter(a =>
        a.nombre?.toLowerCase().includes(q) ||
        a.nombreArtistico?.toLowerCase().includes(q)
      ),
      events: eventsMock.filter(e =>
        e.titulo.toLowerCase().includes(q)
      ),
      products: productsMock.filter(p =>
        p.nombre.toLowerCase().includes(q)
      ),
      songs: songsMock.filter(s =>
        s.titulo.toLowerCase().includes(q)
      ),
    };
    }
}
