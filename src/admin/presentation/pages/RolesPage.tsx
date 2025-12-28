import { useState } from 'react';

type Rol = {
  id: string;
  nombre: string;
  permisos: string[];
  estado: 'activo' | 'inactivo';
};

const permisosDisponibles = ['crear', 'editar', 'eliminar', 'ver'];

const bg = '#0f172a';
const card = '#111827';
const border = '#1f2937';
const text = '#e5e7eb';
const muted = '#9ca3af';
const primary = '#6366f1';

export default function RolesPage() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [nombre, setNombre] = useState('');
  const [permisos, setPermisos] = useState<string[]>([]);
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [soloLectura, setSoloLectura] = useState(false);

  const limpiar = () => {
    setNombre('');
    setPermisos([]);
    setEstado('activo');
    setEditandoId(null);
    setSoloLectura(false);
  };

  const guardar = () => {
    if (!nombre || permisos.length === 0 || soloLectura) return;

    if (editandoId) {
      setRoles(
        roles.map(r =>
          r.id === editandoId ? { ...r, nombre, permisos, estado } : r
        )
      );
    } else {
      setRoles([
        ...roles,
        { id: Date.now().toString(), nombre, permisos, estado },
      ]);
    }

    limpiar();
  };

  const editar = (r: Rol) => {
    setNombre(r.nombre);
    setPermisos(r.permisos);
    setEstado(r.estado);
    setEditandoId(r.id);
    setSoloLectura(false);
  };

  const toggleEstado = (id: string) => {
    setRoles(
      roles.map(r =>
        r.id === id
          ? { ...r, estado: r.estado === 'activo' ? 'inactivo' : 'activo' }
          : r
      )
    );
  };

  const togglePermiso = (p: string) => {
    if (soloLectura) return;
    setPermisos(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  return (
    <div
      style={{
        background: bg,
        minHeight: '100vh',
        padding: '2.5rem 3rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1600px' }}>
        <h2
          style={{
            color: text,
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Gestión de Roles
        </h2>

        {/* ===== FORM HORIZONTAL ===== */}
        <div
          style={{
            background: card,
            padding: '2rem',
            borderRadius: 16,
            border: `1px solid ${border}`,
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 3fr 1.2fr auto auto',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <input
              disabled={soloLectura}
              style={input(border, text)}
              placeholder="Nombre del rol"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />

            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  color: muted,
                  fontSize: '0.75rem',
                  marginBottom: 6,
                }}
              >
                Permisos
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {permisosDisponibles.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePermiso(p)}
                    style={{
                      ...btnGhost(border, text),
                      background: permisos.includes(p)
                        ? '#020617'
                        : 'transparent',
                      opacity: soloLectura ? 0.5 : 1,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <select
              disabled={soloLectura}
              style={input(border, text)}
              value={estado}
              onChange={e => setEstado(e.target.value as any)}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>

            {!soloLectura && (
              <button style={btn(primary)} onClick={guardar}>
                {editandoId ? 'Actualizar' : 'Crear'}
              </button>
            )}

            {(editandoId || soloLectura) && (
              <button style={btnGhost(border, text)} onClick={limpiar}>
                Cerrar
              </button>
            )}
          </div>
        </div>

        {/* ===== LISTA ===== */}
        <div
          style={{
            background: card,
            padding: '2rem',
            borderRadius: 16,
            border: `1px solid ${border}`,
          }}
        >
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
                  <td
                    colSpan={4}
                    style={{
                      color: muted,
                      padding: '3rem',
                    }}
                  >
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
                      onClick={() => toggleEstado(r.id)}
                    >
                      {r.estado === 'activo' ? 'Inactivar' : 'Activar'}
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

/* ===== estilos ===== */

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
});

const btnGhost = (border: string, color: string) => ({
  background: 'transparent',
  border: `1px solid ${border}`,
  color,
  borderRadius: 8,
  padding: '0.45rem 0.9rem',
  fontSize: '0.75rem',
});

const badge = (estado: string) => ({
  padding: '0.35rem 0.75rem',
  borderRadius: 999,
  fontSize: '0.7rem',
  background: estado === 'activo' ? '#022c22' : '#2a0e0e',
  color: estado === 'activo' ? '#34d399' : '#f87171',
});
