// En tu src/apps/admin/songs/index.ts

// Dominio (Usa 'type' para interfaces)
export type { Song } from './domain/models/Song';
export type { SongRepository } from './domain/repositories/SongRepository';

// Aplicación e Infraestructura (Clases)
export * from './application/usecases/createSong.usecase';
// ... el resto de tus usecases
export * from './infrastructure/api/ApiSongRepository';

// Presentación
export * from './presentation/pages/SongListPage';
export * from './presentation/pages/SongFormPage';

export * from './presentation/hooks/useSongs'; 