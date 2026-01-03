import type { HomeRepository } from "../../domain/repositories/HomeRepository";
import type { HomeData } from "../../domain/models/HomeData";
import { HomeMockRepository } from "../../mocks/HomeMockRepository";

class HomeApiRepository implements HomeRepository {
  private mockRepository = new HomeMockRepository();

  async getHomeData(): Promise<HomeData> {
    return this.mockRepository.getHomeData();
  }
}

export const homeRepository = new HomeApiRepository();
