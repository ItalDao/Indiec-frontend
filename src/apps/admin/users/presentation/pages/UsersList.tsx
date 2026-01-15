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

export default function UsersList() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('Admin');
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');

  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');

  /* ===== CONTADORES ===== */
  const totalUsuarios = users.length;
  const usuariosActivos = users.filter(u => u.estado === 'activo').length;
  const usuariosInactivos = users.filter(u => u.estado === 'inactivo').length;

  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setRol('Admin');
    setEstado('activo');
    setEditandoId(null);
  };

  const guardarUsuario = () => {
    if (!nombre || !email || !password) {
      setMensaje('Todos los campos son obligatorios');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    if (editandoId) {
      setUsers(users.map(u =>
        u.id === editandoId
          ? { ...u, nombre, email, password, rol, estado }
          : u
      ));
      setMensaje('Usuario actualizado correctamente');
    } else {
      setUsers([
        ...users,
        { id: Date.now().toString(), nombre, email, password, rol, estado },
      ]);
      setMensaje('Usuario creado correctamente');
    }

    limpiarFormulario();
    setTimeout(() => setMensaje(''), 3000);
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
    setMensaje('Contraseña reseteada a 123456');
    setTimeout(() => setMensaje(''), 3000);
  };

  const eliminarUsuario = (id: string) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmar) return;

    setUsers(users.map(u =>
      u.id === id ? { ...u, estado: 'inactivo' } : u
    ));

    setMensaje('Usuario eliminado correctamente');
    setTimeout(() => setMensaje(''), 3000);
  };

  const usuariosFiltrados = users.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ background: bg, width: '100%', padding: '2rem' }}>
      <h2 style={{ color: text, marginBottom: '0.5rem', textAlign: 'center' }}>
        Gestión de Usuarios
      </h2>

      {/* CONTADOR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '1.2rem',
          color: text,
          fontSize: '0.85rem',
        }}
      >
        <span>Total: <strong>{totalUsuarios}</strong></span>
        <span>Activos: <strong>{usuariosActivos}</strong></span>
        <span>Inactivos: <strong>{usuariosInactivos}</strong></span>
      </div>

      {/* MENSAJE */}
      {mensaje && (
        <div
          style={{
            background: '#022c22',
            color: '#34d399',
            padding: '0.75rem 1rem',
            borderRadius: 10,
            textAlign: 'center',
            marginBottom: '1.5rem',
            maxWidth: 400,
            marginInline: 'auto',
            fontSize: '0.85rem',
          }}
        >
          {mensaje}
        </div>
      )}

      {/* FORM */}
      <div
        style={{
          background: card,
          padding: '2rem',
          borderRadius: 16,
          border: `1px solid ${border}`,
          marginBottom: '2rem',
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

          <select style={input(border, text)} value={estado} onChange={e => setEstado(e.target.value as 'activo' | 'inactivo')}>
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

      {/* SEARCH */}
      <div style={{ maxWidth: 1400, margin: '0 auto 1.5rem' }}>
        <input
          style={input(border, text)}
          placeholder="Buscar por nombre o correo"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
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
        <table width="100%" cellPadding={14} style={{ borderCollapse: 'collapse', color: text }}>
          <thead>
            <tr style={{ color: muted, fontSize: '0.7rem', textAlign: 'center', fontWeight: 600 }}>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: muted, padding: '3rem' }}>
                  No hay usuarios registrados
                </td>
              </tr>
            )}

            {usuariosFiltrados.map(u => (
              <tr key={u.id} style={{ borderTop: `1px solid ${border}`, textAlign: 'center' }}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td><span style={badge(u.estado)}>{u.estado}</span></td>
                <td>
                  <button style={btnGhost(border, text)} onClick={() => editarUsuario(u)}>Editar</button>{' '}
                  <button style={btnGhost(border, text)} onClick={() => resetPassword(u.id)}>Recuperar</button>{' '}
                  <button style={btnGhost(border, text)} onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== styles (SIN CAMBIOS) ===== */

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
