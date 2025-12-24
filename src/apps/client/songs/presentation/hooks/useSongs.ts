import { useState, useEffect, useCallback } from 'react';
import type { Song, SongFilters } from '../../domain/models/Song';
import { getSongs, searchSongs, getSongById, playSong } from '../../application/usecases/index';

export const useSongs = (filters?: SongFilters) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSongs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = filters 
        ? await searchSongs(filters)
        : await getSongs();
      
      setSongs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar canciones');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadSongs();
  }, [loadSongs]);

  return { songs, loading, error, refetch: loadSongs };
};

export const useSong = (id: number) => {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSong = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSongById(id);
        setSong(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la canción');
      } finally {
        setLoading(false);
      }
    };

    loadSong();
  }, [id]);

  const handlePlay = useCallback(async () => {
    if (song) {
      await playSong(song.id);
      setSong({ ...song, streams: song.streams + 1 });
    }
  }, [song]);

  return { song, loading, error, handlePlay };
};