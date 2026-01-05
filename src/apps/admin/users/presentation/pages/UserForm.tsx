import { useState } from 'react';
import { useParams } from 'react-router-dom';

const bg = '#0f172a';
const card = '#111827';
const border = '#1f2937';
const text = '#e5e7eb';
const primary = '#6366f1';

export default function UserForm() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para guardar usuario
    console.log({ nombre, email, rol });
  };

  return (
    <div style={{ background: bg, width: '100%', padding: '2rem', minHeight: '100vh' }}>
      <div
        style={{
          background: card,
          padding: '2rem',
          borderRadius: 16,
          border: `1px solid ${border}`,
          maxWidth: 500,
          margin: '0 auto',
        }}
      >
        <h2 style={{ color: text, marginBottom: '2rem', textAlign: 'center' }}>
          {id ? 'Editar Usuario' : 'Crear Usuario'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: text, display: 'block', marginBottom: '0.5rem' }}>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 8,
                border: `1px solid ${border}`,
                background: '#020617',
                color: text,
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: text, display: 'block', marginBottom: '0.5rem' }}>Correo</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 8,
                border: `1px solid ${border}`,
                background: '#020617',
                color: text,
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ color: text, display: 'block', marginBottom: '0.5rem' }}>Rol</label>
            <select
              value={rol}
              onChange={e => setRol(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 8,
                border: `1px solid ${border}`,
                background: '#020617',
                color: text,
              }}
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: primary,
              color: '#fff',
              border: 'none',
              padding: '0.75rem',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {id ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      </div>
    </div>
  );
}
