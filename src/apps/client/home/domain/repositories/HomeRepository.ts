import type { HomeData } from "../models/HomeData";

export interface HomeRepository {
  getHomeData(): Promise<HomeData>;
}
