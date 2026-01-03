import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import ClientLayout from '../layout/ClientLayout';

/* 👉 IMPORTS DE TU MÓDULO STORE (CLIENT) */
import { StorePage } from '../../../apps/client/store/presentation/pages/StorePage';
import { ProductDetailPage } from '../../../apps/client/store/presentation/pages/ProductDetailPage';
import { CartPage } from '../../client/account/presentation/pages/CartPage/CartPage';
import { CheckoutPage } from '../../client/account/presentation/pages/CheckoutPage/CheckoutPage';
import { ProfilePage } from '../../client/account/presentation/pages/ProfilePage/ProfilePage';
import { OrderDetailPage } from '../../client/account/presentation/pages/OrderDetailPage/OrderDetailPage';
import { FavoritesPage } from '../../client/account/presentation/pages/FavoritesPage/FavoritesPage';
import { OrdersPage } from '../../client/account/presentation/pages/OrdersPage/OrdersPage';

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

        {/* ================= ADMIN ================= */}
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

        {/* ================= CLIENT ================= */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/home" replace />} />
          <Route path="home" element={<TempPage title="Inicio" />} />
          <Route path="search" element={<TempPage title="Búsqueda" />} />
          <Route path="artists" element={<TempPage title="Artistas" />} />
          <Route path="artists/:id" element={<TempPage title="Detalle de Artista" />} />
          <Route path="songs" element={<TempPage title="Canciones" />} />
          <Route path="songs/:id" element={<TempPage title="Detalle de Canción" />} />
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
