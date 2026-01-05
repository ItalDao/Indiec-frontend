// application/usecases/getHome.ts
import type { HomeRepository } from "../../domain/repositories/HomeRepository";

export const getHomeData = (repo: HomeRepository) => {
  return repo.getHomeData();
};