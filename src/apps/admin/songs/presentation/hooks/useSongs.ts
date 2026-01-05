import { useState, useCallback } from 'react';
import type { Song } from '../../domain/models/Song';
import { ApiSongRepository } from '../../infrastructure/api/ApiSongRepository';

const repository = new ApiSongRepository();

export const useSongs = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);

    
    const loadSongs = useCallback(async () => {
        setLoading(true);
        try {
            const data = await repository.getAll();
            setSongs(data);
        } catch (error) {
            console.error("Error al cargar canciones:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createSong = async (newSong: Song) => {
        try {
            await repository.create(newSong);
            return { success: true };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };

    
    const updateSong = async (id: string | number, updatedSong: Song) => {
        try {
            await repository.update(id, updatedSong); // Asegúrate que el repositorio tenga 'update'
            return { success: true };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };

    const deleteSong = async (id: string | number) => {
        try {
            await repository.delete(id);
            return { success: true };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };

    return { 
        songs, 
        loading, 
        loadSongs, 
        createSong, 
        updateSong, 
        deleteSong 
    };
};