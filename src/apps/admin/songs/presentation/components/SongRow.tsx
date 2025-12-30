import { Button, Card } from '../../../../../shared/ui';
import type { Song } from '../../domain/models/Song';

interface Props {
    song: Song;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export const SongRow = ({ song, onDelete, onEdit }: Props) => {
    return (
    <Card style={{ backgroundColor: '#1E293B', border: '1px solid #8B5CF6', marginBottom: '10px' }}>
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <h3 style={{ margin: 0, color: '#F1F5F9' }}>{song.titulo}</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#EC4899' }}>{song.genero} • {song.album}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" size="sm" onClick={() => song.id && onEdit(song.id)}>
            Editar
            </Button>
            <Button variant="secondary" size="sm" onClick={() => song.id && onDelete(song.id)}>
            Eliminar
            </Button>
        </div>
        </div>
    </Card>
    );
};