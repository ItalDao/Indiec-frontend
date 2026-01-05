import type { Song, SongFilters } from '../../domain/models/Song';
import { songApiRepository } from '../../infrastructure/api/songApi';

export const searchSongs = async (filters: SongFilters): Promise<Song[]> => {
  return await songApiRepository.search(filters);
};