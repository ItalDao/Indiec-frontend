import type { Song, SongFilters } from '../../domain/models/Song';
import type { SongRepository } from '../../domain/repositories/SongRepository';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

class SongApiRepository implements SongRepository {
  
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getAll(): Promise<Song[]> {
    try {
      return await this.fetchWithAuth(`${API_URL}/canciones/lista`);
    } catch (error) {
      console.error('Error al obtener canciones:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<Song | null> {
    try {
      const canciones = await this.getAll();
      return canciones.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error al obtener canción por ID:', error);
      throw error;
    }
  }

  async getByArtist(artistaId: number): Promise<Song[]> {
    try {
      return await this.fetchWithAuth(`${API_URL}/canciones/artista/${artistaId}`);
    } catch (error) {
      console.error('Error al obtener canciones del artista:', error);
      throw error;
    }
  }

  async search(filters: SongFilters): Promise<Song[]> {
    try {
      let canciones = await this.getAll();

      if (filters.artistaId) {
        canciones = canciones.filter(c => c.idArtista === filters.artistaId);
      }

      if (filters.genero) {
        canciones = canciones.filter(c => 
          c.genero.toLowerCase().includes(filters.genero!.toLowerCase())
        );
      }

      if (filters.busqueda) {
        const searchLower = filters.busqueda.toLowerCase();
        canciones = canciones.filter(c =>
          c.titulo.toLowerCase().includes(searchLower) ||
          c.artista.toLowerCase().includes(searchLower) ||
          c.album.toLowerCase().includes(searchLower)
        );
      }

      switch (filters.orderBy) {
        case 'recientes':
          canciones.sort((a, b) => b.año - a.año);
          break;
        case 'populares':
          canciones.sort((a, b) => b.streams - a.streams);
          break;
        case 'alfabetico':
          canciones.sort((a, b) => a.titulo.localeCompare(b.titulo));
          break;
      }

      return canciones;
    } catch (error) {
      console.error('Error al buscar canciones:', error);
      throw error;
    }
  }

  async incrementStreams(id: number): Promise<void> {
    try {
      await this.fetchWithAuth(`${API_URL}/canciones/${id}/streams`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error al incrementar streams:', error);
    }
  }
}

export const songApiRepository = new SongApiRepository();