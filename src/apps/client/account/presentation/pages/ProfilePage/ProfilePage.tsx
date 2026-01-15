import { useState } from 'react';
import { Card } from '../../../../../../shared/ui';
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

import styles from './ProfilePage.module.css';

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

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Mi Perfil</h1>
        <p>Bienvenido a tu perfil, {user.name}.</p>
      </header>

      {/* LAYOUT PRINCIPAL */}
      <div className={styles.layout}>
        {/* COLUMNA IZQUIERDA */}
        <Card className={styles.formCard}>
          <h3 className={styles.sectionTitle}>Datos personales</h3>

          <ProfileHeader
            user={user}
            onChange={setUser}
            onPhotoChange={handlePhotoChange}
            onSave={handleSaveProfile}
          />
        </Card>

        {/* COLUMNA DERECHA */}
        <div className={styles.rightColumn}>
          {/* ARRIBA */}
          <Card className={styles.card}>
            <h3 className={styles.sectionTitle}>Últimos pedidos</h3>
            <ProfileOrders orders={orders} />
          </Card>

          {/* ABAJO */}
          <div className={styles.doubleRow}>
            <Card className={styles.card}>
              <h3 className={styles.sectionTitle}>Favoritos</h3>
              <ProfileFavorites
                products={favorites.products}
                onRemove={id => removeFavorite('products', id)}
              />
            </Card>

            <Card className={styles.card}>
              <h3 className={styles.sectionTitle}>Notificaciones</h3>
              <ProfileNotifications
                notifications={notifications}
                onToggle={key =>
                  setNotifications(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }))
                }
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
