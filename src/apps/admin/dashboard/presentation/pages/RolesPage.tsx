// src/apps/admin/dashboard/presentation/pages/RolesPage.tsx

import { useState } from 'react';
import { useRoles } from '../hooks/useRoles';
import type { CreateRolDTO, UpdateRolDTO } from '../../domain/models/Rol';

const permisosDisponibles = ['crear', 'editar', 'eliminar', 'ver'];

const bg = '#0f172a';
const card = '#111827';
const border = '#1f2937';
const text = '#e5e7eb';
const muted = '#9ca3af';
const primary = '#6366f1';

export default function RolesPage() {
  const { roles, loading, error, addRol, editRol, removeRol, toggleEstado } = useRoles();
  
  const [nombre, setNombre] = useState('');
  const [permisos, setPermisos] = useState<string[]>([]);
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');
 const [editandoId, setEditandoId] = useState<string | null>(null);

  const limpiar = () => {
    setNombre('');
    setPermisos([]);
    setEstado('activo');
   setEditandoId(null);
  };

  const guardar = async () => {
  if (!nombre || permisos.length === 0) {
    alert('Por favor completa todos los campos');
    return;
  }

  try {
    if (editandoId) {
      const updateData: UpdateRolDTO = {
        id: editandoId,
        nombre,
        permisos,
        estado,
      };
      await editRol(updateData);
    } else {
      const createData: CreateRolDTO = {
        nombre,
        permisos,
        estado,
      };
      await addRol(createData);
     }
    limpiar();
  } catch (err) {
    console.error('Error saving rol:', err);
    alert(`Error al ${editandoId ? 'actualizar' : 'crear'} rol`);
  }
};

  const editar = (rol: typeof roles[0]) => {
    setNombre(rol.nombre);
    setPermisos(rol.permisos);
    setEstado(rol.estado);
    setEditandoId(rol.id);
  };

  const handleToggleEstado = async (id: string) => {
  try {
    await toggleEstado(id);
  } catch (err) {
    console.error('Error toggling estado:', err);
    alert('Error al cambiar estado del rol');
  }
};

  const handleEliminar = async (id: string) => {
  if (!confirm('¿Estás seguro de eliminar este rol?')) return;
  
  try {
    await removeRol(id);
  } catch (err) {
    console.error('Error deleting rol:', err);
    alert('Error al eliminar rol');
  }
};

   const togglePermiso = (p: string) => {
    setPermisos(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  if (loading) {
    return (
      <div style={{ background: bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: text, fontSize: '18px' }}>Cargando roles...</p>
      </div>
    );
  }

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: '2.5rem 3rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1600px' }}>
        <h2 style={{ color: text, marginBottom: '2rem', textAlign: 'center' }}>
          Gestión de Roles
        </h2>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            color: '#fca5a5',
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
          marginBottom: '2.5rem',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr 1.2fr auto auto',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
             <input
              style={input(border, text)}
              placeholder="Nombre del rol"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: muted, fontSize: '0.75rem', marginBottom: 6 }}>
                Permisos
              </p>
              <div style={{
                display: 'flex',
                gap: 8,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
                {permisosDisponibles.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePermiso(p)}
                    style={{
                      ...btnGhost(border, text),
                      background: permisos.includes(p) ? '#020617' : 'transparent',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

             <select
              style={input(border, text)}
              value={estado}
              onChange={e => setEstado(e.target.value as 'activo' | 'inactivo')}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>

            <button style={btn(primary)} onClick={guardar}>
              {editandoId ? 'Actualizar' : 'Crear'}
            </button>

            {editandoId && (
              <button style={btnGhost(border, text)} onClick={limpiar}>
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* TABLA */}
        <div style={{
          background: card,
          padding: '2rem',
          borderRadius: 16,
          border: `1px solid ${border}`,
        }}>
          <table
            width="100%"
            cellPadding={18}
            style={{
              borderCollapse: 'collapse',
              color: text,
              textAlign: 'center',
            }}
          >
            <thead>
              <tr style={{ color: muted, fontSize: '0.75rem' }}>
                <th>Rol</th>
                <th>Permisos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ color: muted, padding: '3rem' }}>
                    No hay roles registrados
                  </td>
                </tr>
              )}

              {roles.map(r => (
                <tr key={r.id} style={{ borderTop: `1px solid ${border}` }}>
                  <td style={{ fontWeight: 500 }}>{r.nombre}</td>
                  <td style={{ fontSize: '0.75rem', color: muted }}>
                    {r.permisos.join(', ')}
                  </td>
                  <td>
                    <span style={badge(r.estado)}>{r.estado}</span>
                  </td>
                  <td>
                    <button
                      style={btnGhost(border, text)}
                      onClick={() => editar(r)}
                    >
                      ✏️ Editar
                    </button>{' '}
                    <button
                      style={btnGhost(border, text)}
                      onClick={() => handleToggleEstado(r.id)}
                    >
                      {r.estado === 'activo' ? '❌' : '✅'}
                    </button>{' '}
                    <button
                      style={{...btnGhost(border, '#f87171')}}
                      onClick={() => handleEliminar(r.id)}
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
  padding: '0.75rem 1.6rem',
  fontWeight: 600,
  cursor: 'pointer',
});

const btnGhost = (border: string, color: string) => ({
  background: 'transparent',
  border: `1px solid ${border}`,
  color,
  borderRadius: 8,
  padding: '0.45rem 0.9rem',
  fontSize: '0.75rem',
  cursor: 'pointer',
});

 const badge = (estado: string) => ({
  padding: '0.35rem 0.75rem',
  borderRadius: 999,
  fontSize: '0.7rem',
  background: estado === 'activo' ? '#022c22' : '#2a0e0e',
  color: estado === 'activo' ? '#34d399' : '#f87171',
 });