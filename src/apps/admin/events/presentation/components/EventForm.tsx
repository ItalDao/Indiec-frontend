import React, { useState } from 'react';
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

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    background: 'rgba(30, 27, 75, 0.5)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '10px',
    color: '#e2e8f0',
    outline: 'none' as const,
    transition: 'all 0.2s ease',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* CONTENEDOR CON SCROLL */}
      <div style={{ 
        flex: 1, 
        maxHeight: '450px',
        overflowY: 'auto', 
        paddingRight: '10px',
        paddingBottom: '1rem',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px' 
      }}>
        
        {/* TÍTULO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
            Título del Evento
          </label>
          <input 
            type="text"
            name="titulo" 
            defaultValue={initialData?.titulo} 
            required
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
            }}
          />
        </div>

        {/* LUGAR + FECHA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
              Lugar
            </label>
            <input 
              type="text"
              name="lugar" 
              defaultValue={initialData?.lugar} 
              required
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
              Fecha
            </label>
            <input 
              type="date"
              name="fecha" 
              defaultValue={formattedDate} 
              required
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
              }}
            />
          </div>
        </div>

        {/* GÉNERO MUSICAL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
            Género Musical
          </label>
          <input 
            type="text"
            name="generoMusical" 
            defaultValue={initialData?.generoMusical}
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
            }}
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
            Descripción
          </label>
          <textarea 
            name="descripcion" 
            rows={4}
            defaultValue={initialData?.descripcion}
            style={{
              ...inputStyle,
              resize: 'none' as const,
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
            }}
          />
        </div>

        {/* PRECIO + CAPACIDAD */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
              Precio
            </label>
            <input 
              type="number"
              name="precioEntrada" 
              defaultValue={initialData?.precioEntrada}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
              Capacidad
            </label>
            <input 
              type="number"
              name="capacidad" 
              defaultValue={initialData?.capacidad}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
              }}
            />
          </div>
        </div>

        {/* IMAGEN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase' }}>
            Imagen Promocional
          </label>
          {initialData?.imagen && (
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              Imagen actual: {initialData.imagen}
            </p>
          )}
          <input 
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            style={{
              ...inputStyle,
              padding: '8px 12px',
              fontSize: '12px',
            }}
            accept="image/*"
          />
        </div>
      </div>

      {/* BOTONES */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '16px', 
        paddingTop: '16px', 
        borderTop: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '12px 24px',
            background: 'transparent',
            color: '#cbd5e1',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#8b5cf6';
            e.currentTarget.style.color = '#8b5cf6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.color = '#cbd5e1';
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
          }}
        >
          {initialData ? 'Actualizar Evento' : 'Guardar Evento'}
        </button>
      </div>
    </form>
  );
};