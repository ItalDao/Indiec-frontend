import { useState } from 'react';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: string;
  estado: 'activo' | 'inactivo';
};

const rolesDisponibles = ['Admin', 'Editor', 'Viewer'];

const bg = '#0f172a';
const card = '#111827';
const border = '#1f2937';
const text = '#e5e7eb';
const muted = '#9ca3af';
const primary = '#6366f1';

export default function UsuariosPage() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('Admin');
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');

  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setRol('Admin');
    setEstado('activo');
    setEditandoId(null);
  };

  const guardarUsuario = () => {
    if (!nombre || !email || !password) return;

    if (editandoId) {
      setUsers(users.map(u =>
        u.id === editandoId
          ? { ...u, nombre, email, password, rol, estado }
          : u
      ));
    } else {
      setUsers([
        ...users,
        { id: Date.now().toString(), nombre, email, password, rol, estado },
      ]);
    }

    limpiarFormulario();
  };

  const editarUsuario = (u: Usuario) => {
    setEditandoId(u.id);
    setNombre(u.nombre);
    setEmail(u.email);
    setPassword(u.password);
    setRol(u.rol);
    setEstado(u.estado);
  };

  const resetPassword = (id: string) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, password: '123456' } : u
    ));
    alert('Contraseña reseteada a: 123456');
  };

  const eliminarUsuario = (id: string) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, estado: 'inactivo' } : u
    ));
  };

  return (
    <div style={{ background: bg, width: '100%', padding: '2rem' }}>
      <h2 style={{ color: text, marginBottom: '2rem', textAlign: 'center' }}>
        Gestión de Usuarios
      </h2>

      {/* FORM */}
      <div
        style={{
          background: card,
          padding: '2rem',
          borderRadius: 16,
          border: `1px solid ${border}`,
          marginBottom: '3rem',
          maxWidth: 1400,
          marginInline: 'auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 2fr 1.5fr 1.5fr auto auto',
            gap: '1rem',
          }}
        >
          <input style={input(border, text)} placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input style={input(border, text)} placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
          <input style={input(border, text)} type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />

          <select style={input(border, text)} value={rol} onChange={e => setRol(e.target.value)}>
            {rolesDisponibles.map(r => <option key={r}>{r}</option>)}
          </select>

          <select style={input(border, text)} value={estado} onChange={e => setEstado(e.target.value as any)}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <button style={btn(primary)} onClick={guardarUsuario}>
            {editandoId ? 'Actualizar' : 'Crear'}
          </button>

          {editandoId && (
            <button style={btnGhost(border, text)} onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: card,
          padding: '2rem',
          borderRadius: 16,
          border: `1px solid ${border}`,
          maxWidth: 1400,
          marginInline: 'auto',
        }}
      >
        <table
          width="100%"
          cellPadding={14}
          style={{
            borderCollapse: 'collapse',
            color: text,
            fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',
            fontSize: '0.9rem',
            letterSpacing: '0.2px',
          }}
        >
          <thead>
            <tr
              style={{
                color: muted,
                fontSize: '0.7rem',
                textAlign: 'center',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: muted, padding: '3rem' }}>
                  No hay usuarios registrados
                </td>
              </tr>
            )}

            {users.map(u => (
              <tr
                key={u.id}
                style={{
                  borderTop: `1px solid ${border}`,
                  textAlign: 'center',
                }}
              >
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>
                  <span style={badge(u.estado)}>{u.estado}</span>
                </td>
                <td>
                  <button style={btnGhost(border, text)} onClick={() => editarUsuario(u)}>
                    Editar
                  </button>{' '}
                  <button style={btnGhost(border, text)} onClick={() => resetPassword(u.id)}>
                    Recuperar
                  </button>{' '}
                  <button style={btnGhost(border, text)} onClick={() => eliminarUsuario(u.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== styles ===== */

const input = (border: string, color: string) => ({
  background: '#020617',
  border: `1px solid ${border}`,
  borderRadius: 10,
  padding: '0.75rem',
  color,
});

const btn = (bg: string) => ({
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '0.75rem 1.5rem',
  fontWeight: 600,
  cursor: 'pointer',
});

const btnGhost = (border: string, color: string) => ({
  background: 'transparent',
  border: `1px solid ${border}`,
  color,
  borderRadius: 8,
  padding: '0.5rem 0.9rem',
  fontSize: '0.75rem',
  cursor: 'pointer',
});

const badge = (estado: string) => ({
  padding: '0.35rem 0.8rem',
  borderRadius: 999,
  fontSize: '0.7rem',
  background: estado === 'activo' ? '#022c22' : '#2a0e0e',
  color: estado === 'activo' ? '#34d399' : '#f87171',
});
