// src/domain/models/Song.ts
export interface Song {
    id?: string;
    titulo: string;
    artista: string;
    genero?: string;
    album?: string;
    año?: number;
    duracion?: string;
    portada?: string;
    linkAudio?: string;
}