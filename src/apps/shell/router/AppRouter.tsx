// src/apps/shell/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import ClientLayout from '../layout/ClientLayout';
import HomePage from '../../client/home/presentation/pages/HomePage';

//import UsuariosPage from '../../../admin/presentation/pages/UsuariosPage';
//import RolesPage from '../../../admin/presentation/pages/RolesPage';
//import { NuevaVista } from '../../client/events/presentation/pages/nuevaVista';
import { EventsPage } from '../../client/events';

import { ArtistListPage } from '../../client/artists/presentation/pages/ArtistListPage';
import { ArtistDetailPage } from '../../client/artists/presentation/pages/ArtistDetailPage';
import { MisGustos } from '../../client/artists/presentation/components/MisGustos';

/* 👉 IMPORTS DE TU MÓDULO STORE (CLIENT) */
import { StorePage } from '../../../apps/client/store/presentation/pages/StorePage';
import { ProductDetailPage } from '../../../apps/client/store/presentation/pages/ProductDetailPage';
import { CartPage } from '../../client/account/presentation/pages/CartPage/CartPage';
import { CheckoutPage } from '../../client/account/presentation/pages/CheckoutPage/CheckoutPage';
import { ProfilePage } from '../../client/account/presentation/pages/ProfilePage/ProfilePage';
import { OrderDetailPage } from '../../client/account/presentation/pages/OrderDetailPage/OrderDetailPage';
import { FavoritesPage } from '../../client/account/presentation/pages/FavoritesPage/FavoritesPage';
import { OrdersPage } from '../../client/account/presentation/pages/OrdersPage/OrdersPage';

//  IMPORTAR LOS COMPONENTES REALES
import { SongListPage } from '../../client/songs/presentation/pages/SongListPage';
import { SongDetailPage } from '../../client/songs/presentation/pages/SongDetailPage';
// src/apps/shell/router/AppRouter.tsx
import { AboutPage } from '../../client/static/presentation/pages/AboutPage';
import { TermsPage } from '../../client/static/presentation/pages/TermsPage';
import { PrivacyPage } from '../../client/static/presentation/pages/PrivacyPage';
import { ContactPage } from '../../client/static/presentation/pages/ContactPage';
import { FAQPage } from '../../client/support/presentation/pages/FAQPage';
import { UserSettingsPage } from '../../client/settings/presentation/pages/UserSettingsPage';

import { PreferencesPage } from '../../client/preferences/pages/PreferencesPage';

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

        {/* ================= ADMIN ================= */}
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

        {/* ================= CLIENT ================= */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="search" element={<TempPage title="Búsqueda" />} />
          <Route path="artists" element={<TempPage title="Artistas" />} />
          <Route path="artists/:id" element={<TempPage title="Detalle de Artista" />} />
          <Route path="about" element={<AboutPage />} />
<Route path="terms" element={<TermsPage />} />
<Route path="privacy" element={<PrivacyPage />} />
<Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="settings" element={<UserSettingsPage />} />
          <Route path="preferences" element={<PreferencesPage />} />



          {/*  RUTAS REALES */}
          <Route path="songs" element={<SongListPage />} />
          <Route path="songs/:id" element={<SongDetailPage />} />
          
          <Route path="events" element={<TempPage title="Eventos" />} />

          {/* ======== TIENDA ======== */}
          <Route path="store" element={<StorePage />} />
          <Route path="store/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          {/* ✅ NUEVA RUTA (LISTADO DE PEDIDOS) */}
          <Route path="orders" element={<OrdersPage />} />

          {/* 📄 DETALLE DE PEDIDO */}
          <Route path="orders/:id" element={<OrderDetailPage />} />

          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<TempPage title="404 - Página no encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
};
