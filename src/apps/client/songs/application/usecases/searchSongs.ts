import type { Song, SongFilters } from '../../domain/models/Song';
import { MOCK_SONGS } from '../../mocks/songMockData';
// import { songApiRepository } from '../../infrastructure/api/songApi';

export const searchSongs = async (filters: SongFilters): Promise<Song[]> => {
  // DATOS QUEMADOS - Reemplazar cuando se conecte con backend
  let results = [...MOCK_SONGS];
  
  if (filters.busqueda) {
    const search = filters.busqueda.toLowerCase();
    results = results.filter(song => 
      song.titulo.toLowerCase().includes(search) ||
      song.artista.toLowerCase().includes(search) ||
      song.album.toLowerCase().includes(search)
    );
  }
  
  if (filters.genero) {
    results = results.filter(song => song.genero.toLowerCase() === filters.genero?.toLowerCase());
  }
  
  if (filters.artistaId) {
    results = results.filter(song => song.idArtista === filters.artistaId);
  }
  
  if (filters.orderBy === 'recientes') {
    results = results.sort((a, b) => b.año - a.año);
  } else if (filters.orderBy === 'populares') {
    results = results.sort((a, b) => b.streams - a.streams);
  } else if (filters.orderBy === 'alfabetico') {
    results = results.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }
  
  return results;
  
  // BACKEND - Descomentar cuando se conecte con backend
  // return await songApiRepository.search(filters);
};