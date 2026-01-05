import type { SongRepository } from '../../domain/repositories/SongRepository';
import type { Song } from '../../domain/models/Song';

export class CreateSongUseCase {
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async execute(song: Song): Promise<void> {
    // Validaciones de negocio obligatorias según el PDF
    if (!song.titulo || !song.artista || !song.linkAudio) {
      throw new Error("Faltan campos obligatorios");
    }
    await this.songRepository.create(song);
  }
}