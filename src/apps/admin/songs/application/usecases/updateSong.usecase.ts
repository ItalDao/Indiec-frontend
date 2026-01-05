import type { SongRepository } from '../../domain/repositories/SongRepository';
import type { Song } from '../../domain/models/Song';

export class UpdateSongUseCase {
    private songRepository: SongRepository;

    constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
    }

    async execute(id: string, songData: Partial<Song>): Promise<void> {
    if (!id) throw new Error("Se requiere el ID para actualizar");
    await this.songRepository.update(id, songData);
    }
}