import type { Song } from '../../domain/models/Song';
import { MOCK_SONGS } from '../../mocks/songMockData';
// import { songApiRepository } from '../../infrastructure/api/songApi';

export const getSongs = async (): Promise<Song[]> => {
  // DATOS QUEMADOS - Reemplazar cuando se conecte con backend
  return MOCK_SONGS;
  
  // BACKEND - Descomentar cuando se conecte con backend
  // return await songApiRepository.getAll();
};
 