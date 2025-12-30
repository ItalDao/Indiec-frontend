import { api } from '../../../../../shared/services/api';

export interface Artist {
    id: string;
    nombre: string;
}

export class ApiArtistRepository {
    async getAll(): Promise<Artist[]> {
        try {
            
            const response = await api.get<any>('/artista/lista');
            return response.data?.success ? response.data.data : [];
        } catch (error) {
            console.error("Error al obtener artistas:", error);
            return [];
        }
    }
}