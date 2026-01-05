import GeneralSettingsPage from "../../admin/settings/presentation/pages/general/GeneralSettingsPage";
import StaticPageForm from "../../admin/settings/presentation/pages/static-pages/StaticPageForm";
import StaticPagesList from "../../admin/settings/presentation/pages/static-pages/StaticPagesList";
import UsersList from "../../admin/settings/presentation/pages/users/UsersList";
import UserForm from "../../admin/settings/presentation/pages/users/UserForm";
import CatalogsList from "../../admin/settings/presentation/pages/catalogs/CatalogsList";
import RolesList from "../../admin/settings/presentation/pages/roles/RolesList";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import ClientLayout from '../layout/ClientLayout';
import HomePage from '../../client/home/presentation/pages/HomePage';

import UsuariosPage from '../../../admin/presentation/pages/UsuariosPage';
import RolesPage from '../../../admin/presentation/pages/RolesPage';
import { NuevaVista } from '../../client/events/presentation/pages/nuevaVista';
import { EventsPage } from '../../client/events';

import { ArtistListPage } from '../../client/artists/presentation/pages/ArtistListPage';
import { ArtistDetailPage } from '../../client/artists/presentation/pages/ArtistDetailPage';
import { MisGustos } from '../../client/artists/presentation/components/MisGustos';

const TempPage = ({ title }: { title: string }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#F1F5F9' }}>
      {title}
    </h1>
    <p style={{ color: '#94A3B8' }}>Este módulo está en desarrollo</p>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* REDIRECCIÓN INICIAL */}
        <Route path="/" element={<Navigate to="/client/home" replace />} />

        {/* ===== ADMIN ===== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<TempPage title="Dashboard" />} />
          <Route path="artists" element={<TempPage title="Gestión de Artistas" />} />
          <Route path="songs" element={<TempPage title="Gestión de Canciones" />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="store" element={<TempPage title="Gestión de Tienda" />} />
          
          <Route path="settings" element={<Outlet />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralSettingsPage />} />
            <Route path="static-pages" element={<StaticPagesList />} />
            <Route path="static-pages/new" element={<StaticPageForm />} />
            <Route path="static-pages/edit/:id" element={<StaticPageForm />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/new" element={<UserForm />} />
            <Route path="users/edit/:id" element={<UserForm />} />
            <Route path="roles" element={<RolesList />} />
            <Route path="catalogs" element={<CatalogsList />} />
          </Route>
        </Route>

        {/* ===== CLIENT ===== */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="search" element={<TempPage title="Búsqueda" />} />

          <Route path="artists" element={<ArtistListPage />} />
          <Route path="artists/:id" element={<ArtistDetailPage />} />

          <Route path="songs" element={<TempPage title="Canciones" />} />
          <Route path="songs/:id" element={<TempPage title="Detalle de Canción" />} />
          <Route path="events" element={<TempPage title="Eventos (Catálogo)" />} />
          <Route path="store" element={<TempPage title="Tienda" />} />
        </Route>

        {/* RUTA SUELTA */}
        <Route path="/masterclass" element={<MisGustos />} />

        {/* 404 */}
        <Route path="*" element={<TempPage title="404 - Página no encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
};
