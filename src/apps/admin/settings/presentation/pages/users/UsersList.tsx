import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className="page-title">Gestión de Usuarios</h1>
            <p className="page-subtitle">Administra los usuarios y sus permisos</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/settings/users/new")}
          >
            ➕ Nuevo usuario
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th style={{ textAlign: "center" }}>Estado</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ fontWeight: "500" }}>{user.name}</td>
                <td style={{ color: "#94a3b8", fontSize: "14px" }}>{user.email}</td>
                <td>
                  <span className="badge badge-warning">{user.role}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span className={user.status === "active" ? "badge badge-success" : "badge badge-danger"}>
                    {user.status === "active" ? "✓ Activo" : "✗ Inactivo"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons" style={{ justifyContent: "center" }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => navigate(`/admin/settings/users/edit/${user.id}`)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === "active" ? "🔒 Desactivar" : "🔓 Activar"}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">⚠️ Confirmar eliminación</h2>
            <div className="modal-content">
              ¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}