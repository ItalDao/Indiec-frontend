import type { Song } from '../../domain/models/Song';
import { MOCK_SONGS } from '../../mocks/songMockData';
// import { songApiRepository } from '../../infrastructure/api/songApi';

export const getSongById = async (id: number): Promise<Song | null> => {
  // DATOS QUEMADOS - Reemplazar cuando se conecte con backend
  return MOCK_SONGS.find(song => song.id === id) || null;
  
  // BACKEND - Descomentar cuando se conecte con backend
  // return await songApiRepository.getById(id);
};