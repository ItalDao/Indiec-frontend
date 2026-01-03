import type { Song } from '../models/Song';

export interface SongRepository {
    getAll(): Promise<Song[]>;
    getById(id: string): Promise<Song | null>;
    getByArtist(artistId: string): Promise<Song[]>;
    create(song: Song): Promise<void>;
    update(id: string, song: Partial<Song>): Promise<void>;
    delete(id: string): Promise<void>;
}