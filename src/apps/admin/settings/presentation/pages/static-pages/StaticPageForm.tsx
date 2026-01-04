import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

export default function UserForm() {
  const navigate = useNavigate();
  const { createUser, loading } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Gestor de Artistas");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await createUser({
      name,
      email,
      role,
      status,
    });

    if (success) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/admin/settings/users");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Crear Usuario</h1>
        <p className="page-subtitle">Agrega un nuevo usuario al sistema</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: "600" }}>
            Información del Usuario
          </h3>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@indiec.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rol</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Gestor de Artistas">Gestor de Artistas</option>
                <option value="Gestor de Contenido">Gestor de Contenido</option>
                <option value="Gestor de Tienda">Gestor de Tienda</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={status === "active"}
                onChange={() => setStatus(status === "active" ? "inactive" : "active")}
              />
              <span>Usuario activo</span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Creando...' : '💾 Crear usuario'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/settings/users")}
            >
              ← Cancelar
            </button>
          </div>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">✅ ¡Usuario creado!</h2>
            <div className="modal-content">
              El usuario "{name}" ha sido creado exitosamente.
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleConfirm}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}