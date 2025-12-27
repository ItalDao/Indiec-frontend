import { useState } from 'react';

type Rol = {
  id: string;
  nombre: string;
  permisos: string;
  estado: 'activo' | 'inactivo';
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [nombre, setNombre] = useState('');
  const [permisos, setPermisos] = useState('');
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const guardarRol = () => {
    if (!nombre) {
      alert('El nombre es obligatorio');
      return;
    }

    if (editandoId) {
      // ✏️ EDITAR
      setRoles(
        roles.map(r =>
          r.id === editandoId
            ? { ...r, nombre, permisos, estado }
            : r
        )
      );
      setEditandoId(null);
    } else {
      // ➕ CREAR
      const nuevo: Rol = {
        id: Date.now().toString(),
        nombre,
        permisos,
        estado,
      };
      setRoles([...roles, nuevo]);
    }

    limpiarFormulario();
  };

  const editarRol = (rol: Rol) => {
    setNombre(rol.nombre);
    setPermisos(rol.permisos);
    setEstado(rol.estado);
    setEditandoId(rol.id);
  };

  const eliminarRol = (id: string) => {
    if (confirm('¿Eliminar este rol?')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setPermisos('');
    setEstado('activo');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Roles</h2>

      {/* FORMULARIO */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          placeholder="Nombre del rol"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <input
          placeholder="Permisos (ej: crear, editar)"
          value={permisos}
          onChange={e => setPermisos(e.target.value)}
        />

        <select
          value={estado}
          onChange={e => setEstado(e.target.value as 'activo' | 'inactivo')}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button onClick={guardarRol}>
          {editandoId ? 'Actualizar' : 'Crear'}
        </button>

        {editandoId && (
          <button onClick={limpiarFormulario}>Cancelar</button>
        )}
      </div>

      {/* TABLA */}
      <table width="100%" border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Permisos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {roles.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                No hay roles
              </td>
            </tr>
          )}

          {roles.map(rol => (
            <tr key={rol.id}>
              <td>{rol.nombre}</td>
              <td>{rol.permisos || '-'}</td>
              <td>{rol.estado}</td>
              <td>
                <button onClick={() => editarRol(rol)}>Editar</button>{' '}
                <button onClick={() => eliminarRol(rol.id)}>
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
