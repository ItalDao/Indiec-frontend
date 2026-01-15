import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// ===== ADMIN LAYOUT =====
import AdminLayout from '../layout/AdminLayout';

// ===== ADMIN MODULES =====
import { UsersList, UserForm } from '../../admin/users';
import { ArtistsList } from '../../admin/artists';
import { SongsList } from '../../admin/songs';
import { EventsPage } from '../../admin/events';

// Importa la página del ADMIN 
import AdminStorePage from "../../admin/store/presentation/pages/StorePage";

// ✅ DASHBOARD REAL
import Dashboard from '../../admin/dashboard/presentation/pages/Dashboard';

// ===== SETTINGS =====
import GeneralSettingsPage from "../../admin/settings/presentation/pages/general/GeneralSettingsPage";
import StaticPageForm from "../../admin/settings/presentation/pages/static-pages/StaticPageForm";
import StaticPagesList from "../../admin/settings/presentation/pages/static-pages/StaticPagesList";
import CatalogsList from "../../admin/settings/presentation/pages/catalogs/CatalogsList";




// ===== CLIENT LAYOUT =====
import ClientLayout from '../layout/ClientLayout';

// ===== CLIENT PAGES =====
import HomePage from '../../client/home/presentation/pages/HomePage';
import { ArtistListPage } from '../../client/artists/presentation/pages/ArtistListPage';
import { ArtistDetailPage } from '../../client/artists/presentation/pages/ArtistDetailPage';
import { SongListPage } from '../../client/songs/presentation/pages/SongListPage';
import { SongDetailPage } from '../../client/songs/presentation/pages/SongDetailPage';
import { StorePage } from '../../client/store/presentation/pages/StorePage';
import { ProductDetailPage } from '../../client/store/presentation/pages/ProductDetailPage';
import { CartPage } from '../../client/account/presentation/pages/CartPage/CartPage';
import { CheckoutPage } from '../../client/account/presentation/pages/CheckoutPage/CheckoutPage';
import { OrdersPage } from '../../client/account/presentation/pages/OrdersPage/OrdersPage';
import { OrderDetailPage } from '../../client/account/presentation/pages/OrderDetailPage/OrderDetailPage';
import { FavoritesPage } from '../../client/account/presentation/pages/FavoritesPage/FavoritesPage';
import { ProfilePage } from '../../client/account/presentation/pages/ProfilePage/ProfilePage';
import { AboutPage } from '../../client/static/presentation/pages/AboutPage';
import { TermsPage } from '../../client/static/presentation/pages/TermsPage';
import { PrivacyPage } from '../../client/static/presentation/pages/PrivacyPage';
import { ContactPage } from '../../client/static/presentation/pages/ContactPage';
import { FAQPage } from '../../client/support/presentation/pages/FAQPage';
import { UserSettingsPage } from '../../client/settings/presentation/pages/UserSettingsPage';
import { PreferencesPage } from '../../client/preferences/pages/PreferencesPage';
import { MisGustos } from '../../client/artists/presentation/components/MisGustos';
import { EventsPageClient } from '../../client/events/presentation/pages/EventsPageClient';

// ===== TEMP PAGE =====
const TempPage = ({ title }: { title: string }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#F1F5F9' }}>
      {title}
    </h1>
    <p style={{ color: '#94A3B8' }}>Este módulo está en desarrollo</p>
  </div>
);

// ===== ROUTER =====
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* REDIRECCIÓN INICIAL */}
        <Route path="/" element={<Navigate to="/client/home" replace />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="store" element={<AdminStorePage />} />

          {/* ✅ DASHBOARD REAL */}
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="artists" element={<ArtistsList />} />
          <Route path="songs" element={<SongsList />} />
          <Route path="events" element={<EventsPage />} />

          <Route path="users" element={<UsersList />} />
          <Route path="users/new" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />

          {/* CATÁLOGOS */}
          <Route path="catalogs" element={<CatalogsList />} />

          {/* SETTINGS */}
          <Route path="settings" element={<Outlet />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralSettingsPage />} />
            <Route path="static-pages" element={<StaticPagesList />} />
            <Route path="static-pages/new" element={<StaticPageForm />} />
            <Route path="static-pages/edit/:id" element={<StaticPageForm />} />
            <Route path="catalogs" element={<CatalogsList />} />
          </Route>
        </Route>

        {/* ================= CLIENT ================= */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="search" element={<TempPage title="Búsqueda" />} />

          <Route path="artists" element={<ArtistListPage />} />
          <Route path="artists/:id" element={<ArtistDetailPage />} />

          <Route path="songs" element={<SongListPage />} />
          <Route path="songs/:id" element={<SongDetailPage />} />


          <Route path="events" element={<EventsPageClient />} />

          {/* TIENDA */}
          <Route path="store" element={<StorePage />} />
          <Route path="store/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          {/* PEDIDOS */}
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />

          {/* CUENTA */}
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<UserSettingsPage />} />
          <Route path="preferences" element={<PreferencesPage />} />

          {/* PÁGINAS ESTÁTICAS */}
          <Route path="about" element={<AboutPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>

        {/* RUTA SUELTA */}
        <Route path="/masterclass" element={<MisGustos />} />

        {/* 404 */}
        <Route path="*" element={<TempPage title="404 - Página no encontrada" />} />

      </Routes>
    </BrowserRouter>
  );
};
