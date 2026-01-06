import React, { useState } from 'react';
import { Button, Input } from '../../../../../shared/ui';
import { colors } from '../../../../../shared/theme/colors';
import type { Event } from '../../domain/models/Event';

interface Props {
  onSuccess: (data: FormData) => void;
  onCancel: () => void;
  initialData?: Event | null;
}

export const EventForm: React.FC<Props> = ({ onSuccess, onCancel, initialData }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (file) formData.append('imagen', file);
    onSuccess(formData);
  };

  const formattedDate = initialData?.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : '';

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* CONTENEDOR CON SCROLL */}
      <div style={{ 
        flex: 1, 
        maxHeight: '450px', // Ajusta esta altura según el tamaño de tu modal
        overflowY: 'auto', 
        paddingRight: '10px', // Espacio para que la barra no tape el contenido
        paddingBottom: '1rem',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem' 
      }}>
        
        <Input name="titulo" label="Título del Evento" defaultValue={initialData?.titulo} required />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <Input name="lugar" label="Lugar" defaultValue={initialData?.lugar} required />
          <Input name="fecha" label="Fecha" type="date" defaultValue={formattedDate} required />
        </div>

        <Input name="generoMusical" label="Género Musical" defaultValue={initialData?.generoMusical} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: colors.textSecondary || '#94A3B8', fontSize: '0.875rem' }}>Descripción</label>
          <textarea 
            name="descripcion" 
            rows={3}
            defaultValue={initialData?.descripcion}
            style={{ 
              background: colors.background || '#0F172A', 
              color: colors.text, 
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              padding: '0.75rem',
              outline: 'none',
              resize: 'none'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <Input name="precioEntrada" label="Precio" type="number" defaultValue={initialData?.precioEntrada} />
          <Input name="capacidad" label="Capacidad" type="number" defaultValue={initialData?.capacidad} />
        </div>

        <div style={{ border: `1px dashed ${colors.border}`, padding: '1rem', borderRadius: '8px' }}>
          <p style={{ color: colors.textSecondary, fontSize: '0.7rem', marginBottom: '5px' }}>
            {initialData?.imagen ? `Imagen actual: ${initialData.imagen}` : 'Subir imagen'}
          </p>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            style={{ color: colors.text, fontSize: '0.8rem', width: '100%' }}
            accept="image/*"
          />
        </div>
        {/* PIE DE FORMULARIO (FIJO ABAJO) */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginTop: '1.5rem', 
        paddingTop: '1rem', 
        borderTop: `1px solid ${colors.border}` 
      }}>
        <Button type="button" onClick={onCancel} style={{ flex: 1, background: 'transparent', border: `1px solid ${colors.border}` }}>
          Cancelar
        </Button>
        <Button type="submit" style={{ flex: 1, background: colors.primary }}>
          {initialData ? 'Actualizar Evento' : 'Guardar Evento'}
        </Button>
      </div>
      </div>

      
    </form>
  );
};
//Esta es la ultima versión que

/*import React, { useState } from 'react';
import { Button, Input } from '../../../../../shared/ui';
import { colors } from '../../../../../shared/theme/colors';

interface Props {
  onSuccess: (data: FormData) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (file) formData.append('imagen', file);
    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input name="titulo" label="Título del Evento" required />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <Input name="lugar" label="Lugar" required />
        <Input name="fecha" label="Fecha" type="date" required />
      </div>

      <Input name="generoMusical" label="Género Musical" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ color: colors.textSecondary || '#94A3B8', fontSize: '0.875rem' }}>Descripción</label>
        <textarea 
          name="descripcion" 
          rows={3}
          style={{ 
            background: colors.background || '#0F172A', 
            color: colors.text, 
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '0.75rem',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <Input name="precioEntrada" label="Precio" type="number" />
        <Input name="capacidad" label="Capacidad" type="number" />
      </div>

      <div style={{ border: `1px dashed ${colors.border}`, padding: '1rem', borderRadius: '8px' }}>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          style={{ color: colors.text, fontSize: '0.8rem' }}
          accept="image/*"
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button type="button" onClick={onCancel} style={{ flex: 1, background: 'transparent', border: `1px solid ${colors.border}` }}>
          Cancelar
        </Button>
        <Button type="submit" style={{ flex: 1, background: colors.primary }}>
          Guardar Evento
        </Button>
      </div>
    </form>
  );
};
*/