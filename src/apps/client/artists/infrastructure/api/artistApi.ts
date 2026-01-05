import { api } from '../../../../../shared/services/api';
import type { Artist, Song, Event, MerchProduct } from '../../domain/models/Artist';

export const artistApi = {
  // Obtener lista de todos los artistas
  getArtists: async (): Promise<Artist[]> => {
    try {
      const response = await api.get<any>('/artista/lista');
      // Extraemos el array del campo 'data' según tu backend
      return response.data || []; 
    } catch (error) {
      console.error("Error en getArtists:", error);
      return [];
    }
  },

  // Obtener un artista por ID
  getArtistById: async (id: string): Promise<Artist | null> => {
    try {
      const response = await api.get<any>(`/artista/obtener/${id}`);
      return response.data || response;
    } catch (error) {
      console.error("Error en getArtistById:", error);
      return null;
    }
  },

  // ============================================
  // NUEVAS FUNCIONES PARA EL DETALLE DEL ARTISTA
  // ============================================

  // Obtener canciones de un artista
  getArtistSongs: async (artistId: string): Promise<Song[]> => {
    try {
      const response = await api.get<any>(`/artista/${artistId}/canciones`);
      return response.data || [];
    } catch (error) {
      console.error("Error en getArtistSongs:", error);
      
      // MOCK DATA de respaldo si el endpoint no existe
      return [
        {
          id: '1',
          titulo: 'Corazón Valiente',
          duracion: '3:45',
          album: 'Ritmos del Alma',
          reproducciones: 1500000,
          urlReproduccion: 'https://open.spotify.com',
          urlVideo: 'https://youtube.com',
          cover: 'https://placehold.co/200x200/8B5CF6/ffffff?text=Song+1'
        },
        {
          id: '2',
          titulo: 'Noche de Estrellas',
          duracion: '4:12',
          album: 'Ritmos del Alma',
          reproducciones: 890000,
          urlReproduccion: 'https://open.spotify.com',
          urlVideo: 'https://youtube.com',
          cover: 'https://placehold.co/200x200/EC4899/ffffff?text=Song+2'
        },
        {
          id: '3',
          titulo: 'Baila Conmigo',
          duracion: '3:28',
          album: 'Movimiento',
          reproducciones: 2300000,
          urlReproduccion: 'https://open.spotify.com',
          cover: 'https://placehold.co/200x200/A78BFA/ffffff?text=Song+3'
        },
        {
          id: '4',
          titulo: 'Sueños de Libertad',
          duracion: '5:03',
          album: 'Movimiento',
          reproducciones: 670000,
          urlReproduccion: 'https://open.spotify.com',
          urlVideo: 'https://youtube.com',
          cover: 'https://placehold.co/200x200/10B981/ffffff?text=Song+4'
        }
      ];
    }
  },

  // Obtener eventos próximos de un artista
  getArtistEvents: async (artistId: string): Promise<Event[]> => {
    try {
      const response = await api.get<any>(`/artista/${artistId}/eventos`);
      return response.data || [];
    } catch (error) {
      console.error("Error en getArtistEvents:", error);
      
      // MOCK DATA de respaldo si el endpoint no existe
      const today = new Date();
      return [
        {
          id: '1',
          nombre: 'Concierto en Vivo - Tour 2025',
          fecha: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(), // En 15 días
          lugar: 'Teatro Nacional',
          ciudad: 'Quito',
          pais: 'Ecuador',
          precio: 45,
          urlTickets: 'https://ticketshop.com',
          imagen: 'https://placehold.co/800x400/1e293b/ec4899?text=Concierto+1'
        },
        {
          id: '2',
          nombre: 'Festival Indie Latino',
          fecha: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // En 30 días
          lugar: 'Parque La Carolina',
          ciudad: 'Quito',
          pais: 'Ecuador',
          precio: 35,
          urlTickets: 'https://ticketshop.com',
          imagen: 'https://placehold.co/800x400/1e293b/8b5cf6?text=Festival'
        },
        {
          id: '3',
          nombre: 'Acústico Íntimo',
          fecha: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(), // En 45 días
          lugar: 'Café Cultural',
          ciudad: 'Guayaquil',
          pais: 'Ecuador',
          precio: 25,
          urlTickets: 'https://ticketshop.com',
          imagen: 'https://placehold.co/800x400/1e293b/10b981?text=Acustico'
        }
      ];
    }
  },

  // Obtener productos de merchandise de un artista
  getArtistMerch: async (artistId: string): Promise<MerchProduct[]> => {
    try {
      const response = await api.get<any>(`/artista/${artistId}/merch`);
      return response.data || [];
    } catch (error) {
      console.error("Error en getArtistMerch:", error);
      
      // MOCK DATA de respaldo si el endpoint no existe
      return [
        {
          id: '1',
          nombre: 'Camiseta Tour 2025',
          precio: 29.99,
          imagen: 'https://placehold.co/400x500/000000/ffffff?text=T-Shirt',
          descripcion: 'Camiseta oficial del tour 2025. 100% algodón, diseño exclusivo.',
          stock: 15,
          categoria: 'camiseta'
        },
        {
          id: '2',
          nombre: 'Poster Autografiado',
          precio: 19.99,
          imagen: 'https://placehold.co/400x500/8B5CF6/ffffff?text=Poster',
          descripcion: 'Poster de edición limitada con autógrafo del artista.',
          stock: 3,
          categoria: 'poster'
        },
        {
          id: '3',
          nombre: 'Vinilo "Ritmos del Alma"',
          precio: 49.99,
          imagen: 'https://placehold.co/400x500/EC4899/ffffff?text=Vinyl',
          descripcion: 'Álbum completo en vinilo de alta calidad. Edición especial.',
          stock: 8,
          categoria: 'vinilo'
        },
        {
          id: '4',
          nombre: 'Gorra Bordada',
          precio: 24.99,
          imagen: 'https://placehold.co/400x500/1e293b/ffffff?text=Cap',
          descripcion: 'Gorra ajustable con logo bordado.',
          stock: 20,
          categoria: 'accesorio'
        },
        {
          id: '5',
          nombre: 'Hoodie Edición Limitada',
          precio: 54.99,
          imagen: 'https://placehold.co/400x500/0F172A/ffffff?text=Hoodie',
          descripcion: 'Sudadera con capucha, diseño exclusivo. Tallas S-XL.',
          stock: 0, // Agotado
          categoria: 'camiseta'
        },
        {
          id: '6',
          nombre: 'Llavero Metálico',
          precio: 9.99,
          imagen: 'https://placehold.co/400x500/10B981/ffffff?text=Keychain',
          descripcion: 'Llavero de metal con acabado premium.',
          stock: 50,
          categoria: 'accesorio'
        }
      ];
    }
  },

  // Incrementar popularidad al visitar el perfil (opcional)
  incrementPopularity: async (artistId: string): Promise<void> => {
    try {
      await api.post(`/artista/${artistId}/incrementar-popularidad`);
    } catch (error) {
      console.error("Error en incrementPopularity:", error);
      // No hacemos nada si falla, es una métrica opcional
    }
  }
};