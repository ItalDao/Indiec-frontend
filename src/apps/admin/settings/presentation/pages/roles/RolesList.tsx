import { useState } from "react";

interface Role {
  id: string;
  name: string;
  permissions: string[];
  usersCount: number;
}

const allPermissions = [
  "Gestionar artistas",
  "Gestionar canciones",
  "Gestionar eventos",
  "Gestionar productos",
  "Gestionar usuarios",
  "Gestionar roles",
  "Configurar sistema",
  "Ver reportes",
  "Moderar contenido",
];

const mockRoles: Role[] = [
  { 
    id: "1", 
    name: "Super Admin", 
    permissions: allPermissions, 
    usersCount: 1 
  },
  { 
    id: "2", 
    name: "Gestor de Artistas", 
    permissions: ["Gestionar artistas", "Ver reportes"], 
    usersCount: 3 
  },
  { 
    id: "3", 
    name: "Gestor de Contenido", 
    permissions: ["Gestionar canciones", "Gestionar eventos", "Moderar contenido", "Ver reportes"], 
    usersCount: 5 
  },
  { 
    id: "4", 
    name: "Gestor de Tienda", 
    permissions: ["Gestionar productos", "Ver reportes"], 
    usersCount: 2 
  },
];

export default function RolesList() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [currentRole, setCurrentRole] = useState<Role>({ id: "", name: "", permissions: [], usersCount: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setCurrentRole({ id: "", name: "", permissions: [], usersCount: 0 });
    setModalType("add");
    setShowModal(true);
  };

  const handleEdit = (role: Role) => {
    setCurrentRole({ ...role });
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setRoleToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      setRoles((prev) => prev.filter((role) => role.id !== roleToDelete));
      setShowDeleteModal(false);
      setRoleToDelete(null);
    }
  };

  const handleSave = () => {
    if (modalType === "add") {
      setRoles([...roles, { ...currentRole, id: Date.now().toString() }]);
    } else if (modalType === "edit") {
      setRoles(roles.map((role) => (role.id === currentRole.id ? currentRole : role)));
    }
    setShowModal(false);
  };

  const togglePermission = (permission: string) => {
    if (currentRole.permissions.includes(permission)) {
      setCurrentRole({
        ...currentRole,
        permissions: currentRole.permissions.filter((p) => p !== permission),
      });
    } else {
      setCurrentRole({
        ...currentRole,
        permissions: [...currentRole.permissions, permission],
      });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className="page-title">Roles y Permisos</h1>
            <p className="page-subtitle">Define roles y sus permisos en el sistema</p>
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Nuevo rol
          </button>
        </div>
      </div>

      <div className="grid grid-2">
        {roles.map((role) => (
          <div key={role.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>{role.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px" }}>{role.usersCount} usuarios con este rol</p>
              </div>
              <div className="action-buttons">
                <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(role)}>
                  ✏️
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(role.id)}>
                  🗑️
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {role.permissions.map((perm) => (
                <span key={perm} className="badge badge-success" style={{ fontSize: "12px" }}>
                  ✓ {perm}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <h2 className="modal-title">{modalType === "add" ? "➕ Crear rol" : "✏️ Editar rol"}</h2>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Nombre del rol</label>
                <input
                  className="form-input"
                  value={currentRole.name}
                  onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                  placeholder="Ej: Gestor de Artistas"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Permisos</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
                  {allPermissions.map((perm) => (
                    <label key={perm} className="form-checkbox">
                      <input
                        type="checkbox"
                        checked={currentRole.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">⚠️ Confirmar eliminación</h2>
            <div className="modal-content">¿Estás seguro de eliminar este rol?</div>
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