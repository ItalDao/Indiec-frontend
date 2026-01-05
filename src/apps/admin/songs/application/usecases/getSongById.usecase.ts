import type { SongRepository } from '../../domain/repositories/SongRepository';
import type { Song } from '../../domain/models/Song';

export class GetSongByIdUseCase {
    private songRepository: SongRepository;

    constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
    }

    async execute(id: string): Promise<Song | null> {
    if (!id) throw new Error("El ID de la canción es obligatorio");
    return await this.songRepository.getById(id);
    }
}