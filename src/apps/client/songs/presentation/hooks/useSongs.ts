// src/apps/client/songs/presentation/hooks/useSongs.ts

import { useState, useEffect, useCallback } from 'react';
import type { Song, SongFilters } from '../../domain/models/Song';
import { getSongs, searchSongs, getSongById, playSong } from '../../application/usecases';

// Servicio de favoritos (Local Storage)
const FAVORITES_KEY = 'indiec_favorite_songs';

const favoritesService = {
  getFavorites(): number[] {
    const favs = localStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
  },

  addFavorite(songId: number): void {
    const favs = this.getFavorites();
    if (!favs.includes(songId)) {
      favs.push(songId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    }
  },

  removeFavorite(songId: number): void {
    const favs = this.getFavorites();
    const filtered = favs.filter(id => id !== songId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  },

  isFavorite(songId: number): boolean {
    return this.getFavorites().includes(songId);
  }
};

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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadSong = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSongById(id);
        setSong(data);
        setIsFavorite(favoritesService.isFavorite(id));
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

  const toggleFavorite = useCallback(() => {
    if (!song) return;
    
    if (isFavorite) {
      favoritesService.removeFavorite(song.id);
      setIsFavorite(false);
    } else {
      favoritesService.addFavorite(song.id);
      setIsFavorite(true);
    }
  }, [song, isFavorite]);

  return { song, loading, error, handlePlay, isFavorite, toggleFavorite };
};