import { useState } from 'react';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo';
};

const rolesDisponibles = ['Admin', 'Editor', 'Viewer'];

export default function UsuariosPage() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Admin');
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');

  const crearUsuario = () => {
    if (!nombre || !email) {
      alert('Completa nombre y correo');
      return;
    }

    const nuevo: Usuario = {
      id: Date.now().toString(),
      nombre,
      email,
      rol,
      estado,
    };

    setUsers([...users, nuevo]);
    setNombre('');
    setEmail('');
    setRol('Admin');
    setEstado('activo');
  };

  const eliminarUsuario = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const resetPassword = (email: string) => {
    alert(`Se envió un enlace de recuperación a ${email}`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Usuarios</h2>

      {/* FORMULARIO */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <input
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <select value={rol} onChange={e => setRol(e.target.value)}>
          {rolesDisponibles.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={estado}
          onChange={e => setEstado(e.target.value as 'activo' | 'inactivo')}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button onClick={crearUsuario}>Crear</button>
      </div>

      {/* TABLA */}
      <table width="100%" border={1} cellPadding={6}>
        <thead>
          <tr>
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
              <td colSpan={5} style={{ textAlign: 'center' }}>
                No hay usuarios
              </td>
            </tr>
          )}

          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>{user.estado}</td>
              <td>
                <button onClick={() => resetPassword(user.email)}>
                  Reset password
                </button>{' '}
                <button onClick={() => eliminarUsuario(user.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
