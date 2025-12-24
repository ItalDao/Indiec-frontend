import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import ClientLayout from '../layout/ClientLayout';

const TempPage = ({ title }: { title: string }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h1>
    <p style={{ color: '#94A3B8' }}>Este módulo está en desarrollo</p>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/client/home" replace />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<TempPage title="Dashboard" />} />
          <Route path="artists" element={<TempPage title="Gestión de Artistas" />} />
          <Route path="songs" element={<TempPage title="Gestión de Canciones" />} />
          <Route path="events" element={<TempPage title="Gestión de Eventos" />} />
          <Route path="store" element={<TempPage title="Gestión de Tienda" />} />
          <Route path="catalogs" element={<TempPage title="Catálogos" />} />
          <Route path="users" element={<TempPage title="Usuarios y Roles" />} />
          <Route path="settings" element={<TempPage title="Configuraciones" />} />
        </Route>

        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/home" replace />} />
          <Route path="home" element={<TempPage title="Inicio" />} />
          <Route path="search" element={<TempPage title="Búsqueda" />} />
          <Route path="artists" element={<TempPage title="Artistas" />} />
          <Route path="artists/:id" element={<TempPage title="Detalle de Artista" />} />
          <Route path="songs" element={<TempPage title="Canciones" />} />
          <Route path="songs/:id" element={<TempPage title="Detalle de Canción" />} />
          <Route path="events" element={<TempPage title="Eventos" />} />
          <Route path="store" element={<TempPage title="Tienda" />} />
        </Route>

        <Route path="*" element={<TempPage title="404 - Página no encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
};