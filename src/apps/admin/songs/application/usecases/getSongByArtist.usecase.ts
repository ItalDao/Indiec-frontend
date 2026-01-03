import type { SongRepository } from '../../domain/repositories/SongRepository';
import type { Song } from '../../domain/models/Song';

export class GetSongByArtistUseCase { 
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async execute(artistId: string): Promise<Song[]> {
    return await this.songRepository.getByArtist(artistId);
  }
}