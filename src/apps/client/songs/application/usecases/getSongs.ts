import type { Song } from '../../domain/models/Song';
import { songApiRepository } from '../../infrastructure/api/songApi';

export const getSongs = async (): Promise<Song[]> => {
  return await songApiRepository.getAll();
};
