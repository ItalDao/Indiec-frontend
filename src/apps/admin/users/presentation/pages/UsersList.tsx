import { useState } from 'react';
import { Icons } from '../../../../client/songs/presentation/components/Icons';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: string;
  estado: 'activo' | 'inactivo';
};

const rolesDisponibles = ['Admin', 'Editor', 'Viewer'];

export default function UsersList() {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);
    setTimeout(() => setMensaje(''), 3000);
  };

  const editarUsuario = (u: Usuario) => {
    setEditandoId(u.id);
    setNombre(u.nombre);
    setEmail(u.email);
    setPassword(u.password);
    setRol(u.rol);
    setEstado(u.estado);
    setShowModal(true);
  };

  const handleNuevo = () => {
    limpiarFormulario();
    setShowModal(true);
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
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 2rem' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: 'clamp(42px, 7vw, 64px)', 
            fontWeight: '900',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            marginBottom: '16px',
            letterSpacing: '-2px',
          }}>
            Gestión de Usuarios
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: 0,
          }}>
            Administra los usuarios y roles del sistema
          </p>
        </div>

        {/* STATS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ fontSize: '32px', color: '#8b5cf6' }}>
              <Icons.Users />
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#cbd5e1' }}>Total</p>
              <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{totalUsuarios}</p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ fontSize: '32px', color: '#22c55e' }}>
              <Icons.Check />
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#cbd5e1' }}>Activos</p>
              <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{usuariosActivos}</p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ fontSize: '32px', color: '#ef4444' }}>
              <Icons.X />
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#cbd5e1' }}>Inactivos</p>
              <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{usuariosInactivos}</p>
            </div>
          </div>
        </div>

        {/* MENSAJE */}
        {mensaje && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#86efac',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Icons.Check />
            {mensaje}
          </div>
        )}

        {/* BUTTON + SEARCH */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button 
            onClick={handleNuevo}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Icons.Plus />
            Nuevo Usuario
          </button>

          {/* SEARCH BAR */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '8px',
            padding: '0 12px',
            flex: 1,
            minWidth: '250px',
          }}>
            <Icons.Search />
            <input 
              type="text" 
              placeholder="Buscar por nombre o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                padding: '12px 8px',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(45, 27, 105, 0.4) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          padding: '32px',
          backdropFilter: 'blur(16px)',
          overflowX: 'auto',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(139, 92, 246, 0.2)' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Nombre</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Correo</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Rol</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Estado</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#cbd5e1', padding: '48px 16px' }}>
                    No hay usuarios registrados
                  </td>
                </tr>
              )}

              {usuariosFiltrados.map(u => (
                <tr key={u.id} style={{ 
                  borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                  transition: 'background-color 0.2s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '16px', fontWeight: '500', color: '#fff' }}>{u.nombre}</td>
                  <td style={{ padding: '16px', color: '#cbd5e1' }}>{u.email}</td>
                  <td style={{ padding: '16px', color: '#cbd5e1' }}>
                    <span style={{
                      padding: '6px 12px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      color: '#c4b5fd',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}>
                      {u.rol}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <span style={{
                      padding: '6px 12px',
                      background: u.estado === 'activo' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: u.estado === 'activo' ? '#86efac' : '#fca5a5',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}>
                      {u.estado === 'activo' ? '✓ Activo' : '✗ Inactivo'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => editarUsuario(u)}
                        style={{
                          padding: '8px 12px',
                          background: 'transparent',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '6px',
                          color: '#8b5cf6',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                        }}
                      >
                        <Icons.Edit />
                      </button>
                      <button 
                        onClick={() => resetPassword(u.id)}
                        style={{
                          padding: '8px 12px',
                          background: 'transparent',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '6px',
                          color: '#3b82f6',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                        }}
                      >
                        <Icons.Lock />
                      </button>
                      <button 
                        onClick={() => eliminarUsuario(u.id)}
                        style={{
                          padding: '8px 12px',
                          background: 'transparent',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '6px',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                        }}
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}
          onClick={() => setShowModal(false)}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            padding: '48px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            backdropFilter: 'blur(16px)',
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: '700',
              color: '#fff',
            }}>
              {editandoId ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <p style={{
              margin: '0 0 32px 0',
              fontSize: '14px',
              color: '#cbd5e1',
            }}>
              {editandoId ? 'Actualiza los datos del usuario' : 'Crea un nuevo usuario en el sistema'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* NOMBRE */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre completo"
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.8)',
                    border: '2px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* EMAIL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Correo</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.8)',
                    border: '2px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* PASSWORD */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.8)',
                    border: '2px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* ROL + ESTADO */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Rol</label>
                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(30, 27, 75, 0.8)',
                      border: '2px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {rolesDisponibles.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', textTransform: 'uppercase' }}>Estado</label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as 'activo' | 'inactivo')}
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(30, 27, 75, 0.8)',
                      border: '2px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <button
                type="button"
                onClick={() => {
                  limpiarFormulario();
                  setShowModal(false);
                }}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '2px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  color: '#cbd5e1',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={guardarUsuario}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {editandoId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
