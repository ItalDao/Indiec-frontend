import type { SongRepository } from '../../domain/repositories/SongRepository';
import type { Song } from '../../domain/models/Song';

export class GetSongsUseCase {
  private songRepository: SongRepository; 

    constructor(songRepository: SongRepository) {
    this.songRepository = songRepository; 
    }

    async execute(): Promise<Song[]> {
    return await this.songRepository.getAll();
    }
}