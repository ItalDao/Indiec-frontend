import type { Song } from '../../domain/models/Song';
import { songApiRepository } from '../../infrastructure/api/songApi';

export const getSongById = async (id: number): Promise<Song | null> => {
  return await songApiRepository.getById(id);
};