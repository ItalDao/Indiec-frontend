import { api } from '../../../../../shared/services/api';
import type { Song } from '../../domain/models/Song';

export class ApiSongRepository {
  private resource = '/cancion';

  async getAll(): Promise<Song[]> {
    try {
      const response = await api.get<any>(`${this.resource}/lista`);
      if (response.data && response.data.data) {
        return response.data.data;
      }
      console.log("DATOS DESDE LA API:", response.data);
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error en ApiSongRepository:", error);
      return [];
    }
  }

  async create(song: Song): Promise<void> {
    try {
      const payload = {
        artista: song.artista,
        titulo: song.titulo,
        album: song.album,
        año: song.año,
        duracion: song.duracion,
        genero: song.genero,
        portada: song.portada,
        linkAudio: song.linkAudio
      };
      const response = await api.post<any>(`${this.resource}/crear`, payload);
      if (response.data && response.data.success === false) {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      throw new Error(errorMsg);
    }
  }

async update(id: string | number, song: Song): Promise<void> {
  try {
    console.log("¡MÉTODO UPDATE EJECUTÁNDOSE!", song);
    
    const payload = {
      titulo: song.titulo,
      artista: song.artista,
      album: song.album,
      año: song.año,
      duracion: song.duracion, 
      genero: song.genero,
      portada: song.portada,
      linkAudio: song.linkAudio
    };

    const response = await api.put<any>(`${this.resource}/${id}`, payload);
    
    if (response.data && response.data.success === false) {
      throw new Error(response.data.message || 'Error al actualizar');
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message;
    throw new Error(errorMsg);
  }
}
  
  async delete(id: string | number): Promise<void> {
    try {
      const response = await api.delete<any>(`${this.resource}/${id}`);
      
      if (response.data && response.data.success === false) {
        throw new Error(response.data.message || 'Error al eliminar');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      throw new Error(errorMsg);
    }
  }
} 