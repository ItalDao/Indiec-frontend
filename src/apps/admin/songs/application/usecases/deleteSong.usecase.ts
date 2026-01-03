import type { SongRepository } from '../../domain/repositories/SongRepository';

export class DeleteSongUseCase {
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async execute(id: string): Promise<void> {
    if (!id) throw new Error("ID requerido para eliminar");
    await this.songRepository.delete(id);
  }
}