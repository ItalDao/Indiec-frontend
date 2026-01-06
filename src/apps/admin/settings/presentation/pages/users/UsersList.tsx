import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../../../client/songs/presentation/components/Icons";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const mockUsers: User[] = [
  { id: "1", name: "Admin Principal", email: "admin@indiec.com", role: "Administrador", status: "active" },
  { id: "2", name: "Juan Pérez", email: "juan@indiec.com", role: "Editor", status: "active" },
  { id: "3", name: "María García", email: "maria@indiec.com", role: "Moderador", status: "inactive" },
];

export default function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ 
              fontSize: 'clamp(42px, 7vw, 64px)', 
              fontWeight: '900',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
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
            }}>
              Administra los usuarios y sus permisos
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/settings/users/new")}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
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
            <Icons.Plus />
            Nuevo usuario
          </button>
        </div>

        {/* TABLA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#cbd5e1', fontSize: '13px', textTransform: 'uppercase' }}>Nombre</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#cbd5e1', fontSize: '13px', textTransform: 'uppercase' }}>Email</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#cbd5e1', fontSize: '13px', textTransform: 'uppercase' }}>Rol</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#cbd5e1', fontSize: '13px', textTransform: 'uppercase' }}>Estado</th>
                <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#cbd5e1', fontSize: '13px', textTransform: 'uppercase' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderTop: '1px solid rgba(100, 116, 139, 0.2)', transition: 'background 0.2s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={{ padding: '16px', color: '#e2e8f0', fontWeight: '500' }}>{user.name}</td>
                  <td style={{ padding: '16px', color: '#94a3b8', fontSize: '14px' }}>{user.email}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      fontSize: '12px',
                      padding: '6px 12px',
                      background: 'rgba(251, 146, 60, 0.2)',
                      color: '#fed7aa',
                      border: '1px solid rgba(251, 146, 60, 0.3)',
                      borderRadius: '8px',
                      display: 'inline-block',
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '12px',
                      padding: '6px 12px',
                      background: user.status === "active" ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: user.status === "active" ? '#86efac' : '#fca5a5',
                      border: user.status === "active" ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      display: 'inline-block',
                    }}>
                      {user.status === "active" ? "✓ Activo" : "✗ Inactivo"}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => navigate(`/admin/settings/users/edit/${user.id}`)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(100, 116, 139, 0.3)',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#cbd5e1',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(100, 116, 139, 0.3)';
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                        }}
                      >
                        <Icons.Edit />
                      </button>
                      <button
                        onClick={() => toggleStatus(user.id)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: user.status === "active" ? 'rgba(139, 92, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                          border: user.status === "active" ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(34, 197, 94, 0.3)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: user.status === "active" ? '#8b5cf6' : '#86efac',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.8';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                      >
                        <Icons.Lock />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#fca5a5',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
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

      {/* MODAL ELIMINAR */}
      {showDeleteModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.95), rgba(45, 27, 105, 0.7))',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#fca5a5' }}>
              <Icons.Trash />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#e2e8f0', marginBottom: '8px' }}>Eliminar usuario</h2>
            <p style={{ color: '#cbd5e1', marginBottom: '24px' }}>¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.</p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
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
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: 'rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}