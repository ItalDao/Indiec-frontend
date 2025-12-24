import type { Song, SongFilters } from '../models/Song';

export interface SongRepository {
  getAll(): Promise<Song[]>;
  getById(id: number): Promise<Song | null>;
  getByArtist(artistaId: number): Promise<Song[]>;
  search(filters: SongFilters): Promise<Song[]>;
  incrementStreams(id: number): Promise<void>;
}