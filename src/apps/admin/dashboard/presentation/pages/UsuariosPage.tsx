// src/apps/admin/dashboard/presentation/pages/UsuariosPage.tsx

import { useState } from 'react';
import { useUsuarios } from '../hooks/useUsuarios';
import { useRoles } from '../hooks/useRoles';
import type { CreateUsuarioDTO, UpdateUsuarioDTO } from '../../domain/models/UsuarioAdmin';

const bg = '#0f172a';
const card = '#111827';
const border = '#1f2937';
const text = '#e5e7eb';
const muted = '#9ca3af';
const primary = '#6366f1';

export default function UsuariosPage() {
  const { usuarios, loading, error, addUsuario, editUsuario, removeUsuario, resetUserPassword } = useUsuarios();
  const { roles, loading: rolesLoading } = useRoles();
  
 const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rolId, setRolId] = useState(() => roles[0]?.id || ''); 
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');

  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setRolId(roles[0]?.id || '');
    setEstado('activo');
    setEditandoId(null);
  };

  const guardarUsuario = async () => {
    if (!nombre || !email || (!password && !editandoId)) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      if (editandoId) {
        const updateData: UpdateUsuarioDTO = {
          id: editandoId,
          nombre,
          email,
          rolId,
          estado,
          ...(password && { password }),
        };
        await editUsuario(updateData);
      } else {
        const createData: CreateUsuarioDTO = {
          nombre,
          email,
          password,
          rolId,
          estado,
        };
        await addUsuario(createData);
      }
      limpiarFormulario();
    } catch (err) {
      console.error('Error saving usuario:', err);
      alert(`Error al ${editandoId ? 'actualizar' : 'crear'} usuario`);
    }
  };

  const handleEditar = (u: typeof usuarios[0]) => {
    setEditandoId(u.id);
    setNombre(u.nombre);
    setEmail(u.email);
    setPassword(''); // No mostrar password
    setRolId(u.rolId);
    setEstado(u.estado);
  };

  const handleResetPassword = async (id: string) => {
    if (!confirm('¿Resetear contraseña a "123456"?')) return;
    
    try {
      await resetUserPassword(id);
      alert('Contraseña reseteada exitosamente');
    } catch (err) {
      console.error('Error resetting password:', err);
      alert('Error al resetear contraseña');
    }
  };

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      await removeUsuario(id);
    } catch (err) {
      console.error('Error deleting usuario:', err);
      alert('Error al eliminar usuario');
    }
  };

  const getRolNombre = (rolId: string) => {
    const rol = roles.find(r => r.id === rolId);
    return rol?.nombre || 'Sin rol';
  };

  if (loading || rolesLoading) {
    return (
      <div style={{ background: bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: text, fontSize: '18px' }}>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div style={{ background: bg, width: '100%', padding: '2rem' }}>
      <h2 style={{ color: text, marginBottom: '2rem', textAlign: 'center' }}>
        Gestión de Usuarios
      </h2>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          color: '#fca5a5',
          maxWidth: 1400,
          marginInline: 'auto',
        }}>
          {error}
        </div>
      )}

      {/* FORM */}
      <div style={{
        background: card,
        padding: '2rem',
        borderRadius: 16,
        border: `1px solid ${border}`,
        marginBottom: '3rem',
        maxWidth: 1400,
        marginInline: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 2fr 1.5fr 1.5fr auto auto',
          gap: '1rem',
        }}>
          <input
            style={input(border, text)}
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <input
            style={input(border, text)}
            placeholder="Correo"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            style={input(border, text)}
            type="password"
            placeholder={editandoId ? "Dejar vacío para no cambiar" : "Contraseña"}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <select
            style={input(border, text)}
            value={rolId}
            onChange={e => setRolId(e.target.value)}
          >
            {roles.map(r => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>

          <select
            style={input(border, text)}
            value={estado}
            onChange={e => setEstado(e.target.value as 'activo' | 'inactivo')}
          >
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
      <div style={{
        background: card,
        padding: '2rem',
        borderRadius: 16,
        border: `1px solid ${border}`,
        maxWidth: 1400,
        marginInline: 'auto',
      }}>
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
            <tr style={{
              color: muted,
              fontSize: '0.7rem',
              textAlign: 'center',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: muted, padding: '3rem' }}>
                  No hay usuarios registrados
                </td>
              </tr>
            )}
                  
            {usuarios.map(u => (
              <tr
                key={u.id}
                style={{
                  borderTop: `1px solid ${border}`,
                  textAlign: 'center',
                }}
              >
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{getRolNombre(u.rolId)}</td>
                <td>
                  <span style={badge(u.estado)}>{u.estado}</span>
                </td>
                <td>
                  <button
                    style={btnGhost(border, text)}
                    onClick={() => handleEditar(u)}
                  >
                    ✏️
                  </button>{' '}
                  <button
                    style={btnGhost(border, text)}
                    onClick={() => handleResetPassword(u.id)}
                  >
                    🔑
                  </button>{' '}
                  <button
                    style={{...btnGhost(border, '#f87171')}}
                    onClick={() => handleEliminar(u.id)}
                  >
                    🗑️
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

/* STYLES */
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