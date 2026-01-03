import { useEffect, useState } from "react";
import type { HomeData } from "../../domain/models/HomeData";
import { getHomeData } from "../../application/usecases/getHomeData";
import { homeRepository } from "../../infrastructure/repositories/HomeApiRepository";

export const useHome = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeData(homeRepository)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
