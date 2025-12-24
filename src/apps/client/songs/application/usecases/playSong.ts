import { songApiRepository } from '../../infrastructure/api/songApi';

export const playSong = async (id: number): Promise<void> => {
  await songApiRepository.incrementStreams(id);
};