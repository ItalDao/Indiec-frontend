import { useState } from 'react';
import { useCheckout } from '../../hooks/useCheckout';
import { useFavorites } from '../../hooks/useFavorites';
import {
  mockUser,
  mockUserNotifications
} from '../../../infrastructure/mocks/mockUser';
import type { User } from '../../../infrastructure/mocks/mockUser';

import { ProfileHeader } from '../../components/Header/ProfileHeader';
import { ProfileOrders } from '../../components/Orders/ProfileOrders';
import { ProfileFavorites } from '../../components/Favorites/ProfileFavorites';
import { ProfileNotifications } from '../../components/Notifications/ProfileNotifications';

export const ProfilePage = () => {
  const { orders = [] } = useCheckout();
  const { favorites, removeFavorite } = useFavorites();

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('profile_user');
    return saved ? JSON.parse(saved) : mockUser;
  });

  const [notifications, setNotifications] = useState(mockUserNotifications);

  const handleSaveProfile = () => {
    localStorage.setItem('profile_user', JSON.stringify(user));
    alert('Perfil guardado correctamente ✅');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUser(prev => ({
        ...prev,
        photo: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const glassCard = {
    background: 'linear-gradient(135deg, rgba(30,27,75,.85), rgba(45,27,105,.6))',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139,92,246,.25)',
    borderRadius: '18px',
    padding: '2rem',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,.08), 0 8px 24px rgba(0,0,0,.4)'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg,#0f172a 0%,#1e1b4b 12%,#2d1b69 25%,#1a1f3a 40%,#0f172a 60%,#1a0033 75%,#0f172a 100%)',
        padding: '3rem 1rem'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* HEADER */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem,6vw,3rem)',
              fontWeight: 900,
              background:
                'linear-gradient(135deg,#A78BFA,#C084FC)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}
          >
            Mi Perfil
          </h1>
          <p style={{ color: '#CBD5E1', marginTop: '.5rem' }}>
            Bienvenido, {user.name}
          </p>
        </div>

        {/* GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '2rem'
          }}
        >
          {/* IZQUIERDA */}
          <div style={glassCard}>
            <h3 style={{ color: '#E5E7EB', marginBottom: '1.5rem' }}>
              Datos personales
            </h3>

            <ProfileHeader
              user={user}
              onChange={setUser}
              onPhotoChange={handlePhotoChange}
              onSave={handleSaveProfile}
            />
          </div>

          {/* DERECHA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* PEDIDOS */}
            <div style={glassCard}>
              <h3 style={{ color: '#E5E7EB', marginBottom: '1rem' }}>
                Últimos pedidos
              </h3>
              <ProfileOrders orders={orders} />
            </div>

            {/* FAVORITOS + NOTIF */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
              }}
            >
              <div style={glassCard}>
                <h3 style={{ color: '#E5E7EB', marginBottom: '1rem' }}>
                  Favoritos
                </h3>
                <ProfileFavorites
                  products={favorites.products}
                  onRemove={id =>
                    removeFavorite('products', id)
                  }
                />
              </div>

              <div style={glassCard}>
                <h3 style={{ color: '#E5E7EB', marginBottom: '1rem' }}>
                  Notificaciones
                </h3>
                <ProfileNotifications
                  notifications={notifications}
                  onToggle={key =>
                    setNotifications(prev => ({
                      ...prev,
                      [key]: !prev[key]
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
